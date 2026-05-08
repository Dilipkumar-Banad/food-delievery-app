import express from 'express'
import supabase from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get delivery slots
router.get('/slots', async (req, res) => {
  try {
    const { data: slots, error } = await supabase
      .from('delivery_slots')
      .select('*')
      .eq('is_available', true)
      .order('start_time', { ascending: true })

    if (error) throw error
    res.json(slots)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get coupons
router.get('/coupons/:code', async (req, res) => {
  try {
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', req.params.code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !coupon) {
      return res.status(404).json({ error: 'Coupon not found' })
    }

    // Check if coupon is expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Coupon has expired' })
    }

    // Check max usage
    if (coupon.max_usage && coupon.current_usage >= coupon.max_usage) {
      return res.status(400).json({ error: 'Coupon usage limit reached' })
    }

    res.json(coupon)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
