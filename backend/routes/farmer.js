import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware to ensure user is a farmer
const requireFarmer = (req, res, next) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access required' });
  }
  next();
};

// Get farmer's products
router.get('/products', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE farmer_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching farmer products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
router.post('/products', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const { name, description, price, category, image_url, stock_quantity } = req.body;

    const result = await pool.query(
      'INSERT INTO products (name, description, price, category, image_url, stock_quantity, farmer_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, price, category, image_url, stock_quantity, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image_url, stock_quantity } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4, image_url = $5, stock_quantity = $6 WHERE id = $7 AND farmer_id = $8 RETURNING *',
      [name, description, price, category, image_url, stock_quantity, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 AND farmer_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get farmer's orders
router.get('/orders', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT o.id, o.total_amount, o.status, o.created_at, u.name as customer_name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN users u ON o.user_id = u.id
      WHERE oi.farmer_id = $1
      ORDER BY o.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching farmer orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get farmer stats
router.get('/stats', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const productsResult = await pool.query('SELECT COUNT(*) FROM products WHERE farmer_id = $1', [req.user.id]);
    const ordersResult = await pool.query('SELECT COUNT(DISTINCT order_id) FROM order_items WHERE farmer_id = $1', [req.user.id]);
    const revenueResult = await pool.query('SELECT SUM(quantity * price) FROM order_items WHERE farmer_id = $1', [req.user.id]);

    res.json({
      products: parseInt(productsResult.rows[0].count),
      orders: parseInt(ordersResult.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].sum || 0)
    });
  } catch (error) {
    console.error('Error fetching farmer stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;