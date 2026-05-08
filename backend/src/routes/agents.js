import express from 'express';
import supabase from '../config/database.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Get all agents (admin only)
router.get('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*');

    if (error) throw error;
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get agent assignments
router.get('/my-orders', authenticateToken, authorizeRole(['agent']), async (req, res) => {
  try {
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (agentError) throw agentError;

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        users (name, phone, email)
      `)
      .eq('assigned_agent_id', agent.id)
      .in('status', ['confirmed', 'in_transit'])
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order delivery status
router.put('/orders/:orderId/status', authenticateToken, authorizeRole(['agent']), async (req, res) => {
  try {
    const { status } = req.body;

    const { data: order, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date()
      })
      .eq('id', req.params.orderId)
      .select()
      .single();

    if (error) throw error;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
