import pool from './config/database.js';

const createTables = async () => {
  try {
    console.log('Creating database tables...');

    // Drop existing tables first (in correct order due to foreign keys)
    await pool.query('DROP TABLE IF EXISTS contact_messages CASCADE');
    await pool.query('DROP TABLE IF EXISTS order_items CASCADE');
    await pool.query('DROP TABLE IF EXISTS orders CASCADE');
    await pool.query('DROP TABLE IF EXISTS wishlist CASCADE');
    await pool.query('DROP TABLE IF EXISTS cart CASCADE');
    await pool.query('DROP TABLE IF EXISTS products CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');

    // Users table with enhanced roles
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'farmer', 'customer')),
        farm_name VARCHAR(200),
        farm_description TEXT,
        farm_location VARCHAR(200),
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table with farmer_id
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image_url VARCHAR(500),
        stock_quantity INTEGER DEFAULT 0,
        farmer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        is_approved BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cart table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Wishlist table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Order items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        farmer_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

const seedData = async () => {
  try {
    console.log('Seeding database with sample data...');

    // Check if data already exists
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCount.rows[0].count) > 0) {
      console.log('Database already has data. Skipping seed...');
      return;
    }

    // Create admin user
    await pool.query(`
      INSERT INTO users (name, email, password, phone, address, role, is_verified) VALUES
      ('Admin User', 'admin@farmtotable.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0001', '123 Admin St, City, State 12345', 'admin', true)
    `);

    // Create farmer users
    await pool.query(`
      INSERT INTO users (name, email, password, phone, address, role, farm_name, farm_description, farm_location, is_verified) VALUES
      ('John Farmer', 'john.farmer@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0002', '456 Farm Rd, Rural Area, State 12345', 'farmer', 'Green Valley Farm', 'Organic vegetables and fruits grown with sustainable practices', 'Green Valley, State 12345', true),
      ('Sarah Green', 'sarah.green@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0003', '789 Organic Way, Farm Town, State 12345', 'farmer', 'Sunshine Organic Farm', 'Premium dairy products from grass-fed cows', 'Sunshine Valley, State 12345', true),
      ('Mike Harvest', 'mike.harvest@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0004', '321 Harvest Lane, Farm County, State 12345', 'farmer', 'Fresh Harvest Farm', 'Seasonal fruits and premium meat products', 'Harvest County, State 12345', true)
    `);

    // Create customer users
    await pool.query(`
      INSERT INTO users (name, email, password, phone, address, role) VALUES
      ('Jane Customer', 'jane@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0005', '123 Customer St, City, State 12345', 'customer'),
      ('Bob Smith', 'bob@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0006', '456 Buyer Ave, City, State 12345', 'customer')
    `);

    // Get farmer IDs for product assignment
    const farmers = await pool.query('SELECT id, name FROM users WHERE role = $1', ['farmer']);
    const johnFarmer = farmers.rows.find(f => f.name === 'John Farmer');
    const sarahGreen = farmers.rows.find(f => f.name === 'Sarah Green');
    const mikeHarvest = farmers.rows.find(f => f.name === 'Mike Harvest');

    // Create sample products with farmer assignments
    await pool.query(`
      INSERT INTO products (name, description, price, category, image_url, stock_quantity, farmer_id) VALUES
      ('Organic Tomatoes', 'Fresh organic tomatoes grown locally', 4.99, 'vegetables', 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800', 50, $1),
      ('Organic Carrots', 'Sweet organic carrots', 3.49, 'vegetables', 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800', 75, $1),
      ('Organic Spinach', 'Fresh organic spinach leaves', 4.49, 'vegetables', 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800', 40, $1),
      ('Organic Potatoes', 'Fresh organic potatoes', 2.99, 'vegetables', 'https://images.pexels.com/photos/144248/potatoes-food-wood-knife-144248.jpeg?auto=compress&cs=tinysrgb&w=800', 90, $1),
      ('Free-Range Eggs', 'Farm-fresh eggs from free-range chickens', 6.99, 'dairy', 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800', 30, $2),
      ('Fresh Milk', 'Creamy fresh milk from grass-fed cows', 5.99, 'dairy', 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=800', 25, $2),
      ('Farm Cheese', 'Artisanal farm cheese', 12.99, 'dairy', 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=800', 20, $2),
      ('Organic Apples', 'Crisp organic apples', 7.99, 'fruits', 'https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=800', 60, $3),
      ('Organic Strawberries', 'Sweet organic strawberries', 8.99, 'fruits', 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800', 35, $3),
      ('Grass-Fed Beef', 'Premium grass-fed beef', 24.99, 'meat', 'https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-361184.jpeg?auto=compress&cs=tinysrgb&w=800', 15, $3)
    `, [johnFarmer.id, sarahGreen.id, mikeHarvest.id]);

    console.log('Sample data seeded successfully!');
    console.log('Login credentials:');
    console.log('Admin: admin@farmtotable.com / password');
    console.log('Farmer: john.farmer@email.com / password');
    console.log('Customer: jane@email.com / password');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

const main = async () => {
  await createTables();
  await seedData();
  process.exit(0);
};

main();