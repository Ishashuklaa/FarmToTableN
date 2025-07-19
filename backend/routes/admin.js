import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, address, role, farm_name, farm_location, is_verified, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get farmers only
router.get('/farmers', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, address, farm_name, farm_description, farm_location, is_verified, created_at 
      FROM users 
      WHERE role = 'farmer'
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get customers only
router.get('/customers', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, address, created_at 
      FROM users 
      WHERE role = 'customer'
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify/Unverify farmer
router.put('/farmers/:id/verify', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_verified } = req.body;

    const result = await pool.query(
      'UPDATE users SET is_verified = $1 WHERE id = $2 AND role = $3 RETURNING *',
      [is_verified, id, 'farmer']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating farmer verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats (Admin only)
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const usersResult = await pool.query('SELECT COUNT(*) FROM users WHERE role = $1', ['customer']);
    const farmersResult = await pool.query('SELECT COUNT(*) FROM users WHERE role = $1', ['farmer']);
    const productsResult = await pool.query('SELECT COUNT(*) FROM products');
    const ordersResult = await pool.query('SELECT COUNT(*) FROM orders');
    const revenueResult = await pool.query('SELECT SUM(total_amount) FROM orders');

    res.json({
      customers: parseInt(usersResult.rows[0].count),
      farmers: parseInt(farmersResult.rows[0].count),
      products: parseInt(productsResult.rows[0].count),
      orders: parseInt(ordersResult.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].sum || 0)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (Admin only)
router.get('/orders', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products with farmer info
router.get('/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name as farmer_name, u.farm_name
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Disapprove product
router.put('/products/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body;

    const result = await pool.query(
      'UPDATE products SET is_approved = $1 WHERE id = $2 RETURNING *',
      [is_approved, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product approval:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;