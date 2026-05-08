import express from 'express';
import supabase from '../config/database.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import { sendOrderConfirmation } from '../services/emailService.js';
import crypto from 'crypto';
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        users (name, email, phone)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Check ownership
    if (order.customer_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize payment (Razorpay)
router.post("/payment/init", authenticateToken, async (req, res) => {
  try {
    const { items, delivery_slot, delivery_address, amount, coupon_code } = req.body;

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{
        customer_id: req.user.id,
        delivery_slot,
        delivery_address,
        total: amount,
        coupon_code,
        status: "pending",
        payment_status: "pending"
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `order_${order.id}`,
    });

    res.status(201).json({
      order_id: order.id,
      razorpay_order_id: razorpayOrder.id,
      amount: amount,
      currency: "INR"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/payment/verify', authenticateToken, async (req, res) => {
  try {
    const { order_id, razorpay_order_id, payment_id, signature } = req.body;

    // Verify Razorpay signature using Razorpay order id
    const isValidSignature = verifyRazorpaySignature(razorpay_order_id, payment_id, signature);

    if (!isValidSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update order with payment details
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        payment_id,
        razorpay_order_id,
        status: 'confirmed',
        updated_at: new Date()
      })
      .eq('id', order_id)
      .select()
      .single();

    if (error) throw error;

    // Send confirmation email
    try {
      await sendOrderConfirmation(req.user.email, order);
    } catch (emailError) {
      console.log('Email notification failed:', emailError);
    }

    res.json({ success: true, order_id: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to verify Razorpay signature
function verifyRazorpaySignature(razorpayOrderId, paymentId, signature) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || 'test_secret';
    const body = `${razorpayOrderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Create order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, delivery_slot, delivery_address, total, coupon_code } = req.body;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_id: req.user.id,
        delivery_slot,
        delivery_address,
        total,
        coupon_code,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Send confirmation email
    try {
      await sendOrderConfirmation(req.user.email, order);
    } catch (emailError) {
      console.log('Email notification failed:', emailError);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin/agent)
router.put('/:id/status', authenticateToken, authorizeRole(['admin', 'agent']), async (req, res) => {
  try {
    const { status } = req.body;

    const { data: order, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Payment confirmation
router.post('/:id/payment-confirm', authenticateToken, async (req, res) => {
  try {
    const { payment_id, payment_method } = req.body;

    const { data: order, error } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        payment_id,
        payment_method,
        status: 'confirmed',
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
