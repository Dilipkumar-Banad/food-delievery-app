import express from 'express';
import supabase from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: cart, error } = await supabase
      .from('carts')
      .select('*, products (*)')
      .eq('customer_id', req.user.id)
      .eq('is_active', true);

    if (error) throw error;
    res.json(cart || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post('/items', authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid product_id or quantity' });
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from('carts')
      .select('*')
      .eq('customer_id', req.user.id)
      .eq('product_id', product_id)
      .single();

    if (existingItem) {
      // Update quantity
      const { data: updated, error: updateError } = await supabase
        .from('carts')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return res.json(updated);
    }

    // Add new item to cart
    const { data: cartItem, error: insertError } = await supabase
      .from('carts')
      .insert([{
        customer_id: req.user.id,
        product_id,
        quantity,
        is_active: true
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item
router.put('/items/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const { data: updated, error } = await supabase
      .from('carts')
      .update({ quantity })
      .eq('id', req.params.id)
      .eq('customer_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    if (!updated) return res.status(404).json({ error: 'Cart item not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/items/:id', authenticateToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', req.params.id)
      .eq('customer_id', req.user.id);

    if (error) throw error;
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('customer_id', req.user.id)
      .eq('is_active', true);

    if (error) throw error;
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
