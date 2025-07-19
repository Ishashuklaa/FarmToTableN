import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, role, farm_name, farm_description, farm_location } = req.body;

    console.log('Registration attempt:', { email, role });

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role-specific fields
    let query = 'INSERT INTO users (name, email, password, phone, address, role';
    let values = [name, email, hashedPassword, phone, address, role || 'customer'];
    let paramCount = 6;

    if (role === 'farmer') {
      query += ', farm_name, farm_description, farm_location, is_verified';
      values.push(farm_name, farm_description, farm_location, true);
      paramCount += 4;
    } else if (role === 'admin') {
      query += ', is_verified';
      values.push(true);
      paramCount += 1;
    }

    query += ') VALUES (';
    for (let i = 1; i <= paramCount; i++) {
      query += `$${i}`;
      if (i < paramCount) query += ', ';
    }
    query += ') RETURNING *';

    console.log('Executing query:', query);
    console.log('With values:', values);

    const result = await pool.query(query, values);
    const user = result.rows[0];
    delete user.password;

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    console.log('Registration successful for:', user.email);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete user.password;

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;