-- Complete Database Setup Script
-- Run this script to create the entire Farm to Table database

-- Connect to PostgreSQL and create database
-- Run this first: CREATE DATABASE farm_to_table;

-- Use the farm_to_table database
\c farm_to_table;

-- Import schema
\i schema.sql

-- Import sample data
\i sample-data.sql

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;

-- Show all tables
\dt

-- Show sample data counts
SELECT 
    'Users: ' || COUNT(*) as summary FROM users
UNION ALL
SELECT 
    'Products: ' || COUNT(*) FROM products
UNION ALL
SELECT 
    'Cart Items: ' || COUNT(*) FROM cart
UNION ALL
SELECT 
    'Orders: ' || COUNT(*) FROM orders;

-- Show login credentials
SELECT 
    'Login Credentials:' as info
UNION ALL
SELECT 
    'Admin: admin@farmtotable.com / password'
UNION ALL
SELECT 
    'User: john@email.com / password';