import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT w.*, p.name, p.price, p.image_url, p.stock_quantity 
      FROM wishlist w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.user_id = $1
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { product_id } = req.body;

    // Check if item already exists in wishlist
    const existingItem = await pool.query(
      'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [req.user.id, product_id]
    );

    if (existingItem.rows.length > 0) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const result = await pool.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, product_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM wishlist WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;