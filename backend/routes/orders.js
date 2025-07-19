import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name, p.image_url
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [req.user.id]);

    // Group order items by order
    const ordersMap = new Map();
    result.rows.forEach(row => {
      if (!ordersMap.has(row.id)) {
        ordersMap.set(row.id, {
          id: row.id,
          total_amount: row.total_amount,
          status: row.status,
          shipping_address: row.shipping_address,
          created_at: row.created_at,
          items: []
        });
      }
      
      if (row.product_id) {
        ordersMap.get(row.id).items.push({
          product_id: row.product_id,
          quantity: row.quantity,
          price: row.price,
          name: row.name,
          image_url: row.image_url
        });
      }
    });

    res.json(Array.from(ordersMap.values()));
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { total_amount, shipping_address, items } = req.body;

    // Create order
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, total_amount, shipping_address]
    );

    const order = orderResult.rows[0];

    // Create order items with farmer_id
    for (const item of items) {
      // Get farmer_id from product
      const productResult = await client.query('SELECT farmer_id FROM products WHERE id = $1', [item.product_id]);
      const farmer_id = productResult.rows[0]?.farmer_id;

      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price, farmer_id) VALUES ($1, $2, $3, $4, $5)',
        [order.id, item.product_id, item.quantity, item.price, farmer_id]
      );
    }

    // Clear user's cart
    await client.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);

    await client.query('COMMIT');
    res.status(201).json(order);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

export default router;