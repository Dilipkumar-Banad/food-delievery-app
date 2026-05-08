import express from 'express'
import supabase from '../config/database.js'
import { authenticateToken, authorizeRole } from '../middleware/auth.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    if (!product) return res.status(404).json({ error: 'Product not found' })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', req.params.category)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, price, category, flour_type, quantity, image_url } = req.body

    if (!name || !price || !category || !flour_type) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name,
        description,
        price,
        category,
        flour_type,
        quantity: quantity || 100,
        image_url,
        is_active: true
      }])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update product (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, price, quantity, is_active } = req.body

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price,
        quantity,
        is_active,
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete product (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
