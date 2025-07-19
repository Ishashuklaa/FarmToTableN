-- Sample Data for Farm to Table Application
-- Note: Passwords are hashed using bcrypt with salt rounds 10
-- Plain text password for all accounts: "password"

-- Insert Users (Admin and Regular Users)
INSERT INTO users (name, email, password, phone, address, role) VALUES
('Admin User', 'admin@farmtotable.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0001', '123 Admin St, City, State 12345', 'admin'),
('John Doe', 'john@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0002', '456 User Ave, City, State 12345', 'user'),
('Jane Smith', 'jane@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0003', '789 Customer Blvd, City, State 12345', 'user'),
('Mike Johnson', 'mike@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0004', '321 Buyer St, City, State 12345', 'user'),
('Sarah Wilson', 'sarah@email.com', '$2a$10$k9.YGMfLrVqXWj8CQEjSHuXzJLvZmvDa3pFJWmUQTqLjhckSRLz4K', '555-0005', '654 Shopper Ave, City, State 12345', 'user');

-- Insert Products
INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES
-- Vegetables
('Organic Tomatoes', 'Fresh organic tomatoes grown locally without pesticides. Perfect for salads, cooking, and sauces.', 4.99, 'vegetables', 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800', 50),
('Organic Carrots', 'Sweet and crunchy organic carrots, rich in beta-carotene and perfect for snacking or cooking.', 3.49, 'vegetables', 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800', 75),
('Organic Spinach', 'Fresh organic spinach leaves, packed with iron and vitamins. Great for salads and smoothies.', 4.49, 'vegetables', 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800', 40),
('Organic Potatoes', 'Fresh organic potatoes, perfect for baking, mashing, or frying. Grown in rich, fertile soil.', 2.99, 'vegetables', 'https://images.pexels.com/photos/144248/potatoes-food-wood-knife-144248.jpeg?auto=compress&cs=tinysrgb&w=800', 90),
('Organic Bell Peppers', 'Colorful organic bell peppers, sweet and crunchy. Perfect for stir-fries and salads.', 5.99, 'vegetables', 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800', 35),

-- Fruits
('Organic Apples', 'Crisp and sweet organic apples, perfect for snacking or baking. Grown without chemicals.', 7.99, 'fruits', 'https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=800', 60),
('Organic Bananas', 'Sweet and creamy organic bananas, rich in potassium and perfect for smoothies.', 3.99, 'fruits', 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=800', 80),
('Organic Strawberries', 'Juicy and sweet organic strawberries, perfect for desserts or eating fresh.', 8.99, 'fruits', 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800', 35),
('Organic Oranges', 'Fresh and juicy organic oranges, packed with vitamin C and natural sweetness.', 6.49, 'fruits', 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=800', 45),
('Organic Blueberries', 'Antioxidant-rich organic blueberries, perfect for breakfast, baking, or snacking.', 12.99, 'fruits', 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=800', 25),

-- Dairy
('Free-Range Eggs', 'Farm-fresh eggs from free-range chickens, rich in protein and perfect for any meal.', 6.99, 'dairy', 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800', 30),
('Fresh Milk', 'Creamy fresh milk from grass-fed cows, perfect for drinking, cereal, or cooking.', 5.99, 'dairy', 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=800', 25),
('Farm Cheese', 'Artisanal farm cheese made from fresh milk, aged to perfection with rich flavor.', 12.99, 'dairy', 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=800', 20),
('Greek Yogurt', 'Thick and creamy Greek yogurt made from organic milk, high in protein and probiotics.', 8.49, 'dairy', 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800', 40),
('Farm Butter', 'Rich and creamy farm butter made from fresh cream, perfect for cooking and baking.', 7.99, 'dairy', 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800', 30),

-- Meat
('Grass-Fed Beef', 'Premium grass-fed beef, tender and flavorful, raised without hormones or antibiotics.', 24.99, 'meat', 'https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-361184.jpeg?auto=compress&cs=tinysrgb&w=800', 15),
('Free-Range Chicken', 'Fresh free-range chicken, naturally raised with access to pasture and organic feed.', 18.99, 'meat', 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800', 20),
('Farm Pork', 'High-quality farm pork from pigs raised in natural conditions with organic feed.', 21.99, 'meat', 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800', 12),
('Fresh Fish', 'Fresh catch fish, sustainably sourced and perfect for healthy meals.', 19.99, 'meat', 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800', 18),
('Organic Turkey', 'Organic turkey raised on pasture, perfect for special occasions and healthy meals.', 22.99, 'meat', 'https://images.pexels.com/photos/7218637/pexels-photo-7218637.jpeg?auto=compress&cs=tinysrgb&w=800', 10);

-- Insert Sample Cart Items (for demonstration)
INSERT INTO cart (user_id, product_id, quantity) VALUES
(2, 1, 2),  -- John has 2 organic tomatoes
(2, 6, 1),  -- John has 1 organic apples
(2, 11, 1), -- John has 1 free-range eggs
(3, 3, 3),  -- Jane has 3 organic spinach
(3, 8, 2),  -- Jane has 2 organic strawberries
(4, 5, 1),  -- Mike has 1 organic bell peppers
(4, 12, 1); -- Mike has 1 fresh milk

-- Insert Sample Wishlist Items
INSERT INTO wishlist (user_id, product_id) VALUES
(2, 13), -- John wants farm cheese
(2, 16), -- John wants grass-fed beef
(3, 1),  -- Jane wants organic tomatoes
(3, 9),  -- Jane wants organic oranges
(4, 7),  -- Mike wants organic bananas
(4, 14), -- Mike wants Greek yogurt
(5, 2),  -- Sarah wants organic carrots
(5, 10); -- Sarah wants organic blueberries

-- Insert Sample Orders
INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES
(2, 45.97, 'delivered', '456 User Ave, City, State 12345'),
(2, 32.48, 'shipped', '456 User Ave, City, State 12345'),
(3, 67.45, 'processing', '789 Customer Blvd, City, State 12345'),
(4, 28.99, 'pending', '321 Buyer St, City, State 12345'),
(5, 55.47, 'delivered', '654 Shopper Ave, City, State 12345');

-- Insert Sample Order Items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order 1 (John's delivered order)
(1, 1, 3, 4.99),   -- 3 organic tomatoes
(1, 6, 2, 7.99),   -- 2 organic apples
(1, 11, 1, 6.99),  -- 1 free-range eggs
(1, 12, 1, 5.99),  -- 1 fresh milk

-- Order 2 (John's shipped order)
(2, 3, 2, 4.49),   -- 2 organic spinach
(2, 8, 1, 8.99),   -- 1 organic strawberries
(2, 13, 1, 12.99), -- 1 farm cheese

-- Order 3 (Jane's processing order)
(3, 2, 4, 3.49),   -- 4 organic carrots
(3, 7, 3, 3.99),   -- 3 organic bananas
(3, 14, 2, 8.49),  -- 2 Greek yogurt
(3, 16, 1, 24.99), -- 1 grass-fed beef

-- Order 4 (Mike's pending order)
(4, 4, 5, 2.99),   -- 5 organic potatoes
(4, 9, 2, 6.49),   -- 2 organic oranges

-- Order 5 (Sarah's delivered order)
(5, 5, 3, 5.99),   -- 3 organic bell peppers
(5, 10, 2, 12.99), -- 2 organic blueberries
(5, 15, 1, 7.99),  -- 1 farm butter
(5, 17, 1, 18.99); -- 1 free-range chicken

-- Insert Sample Contact Messages
INSERT INTO contact_messages (name, email, subject, message) VALUES
('Alice Brown', 'alice@email.com', 'Product Quality Inquiry', 'Hi, I would like to know more about your organic certification process. Are all your vegetables certified organic?'),
('Bob Davis', 'bob@email.com', 'Delivery Question', 'What are your delivery areas and times? I live in the suburbs and want to know if you deliver to my location.'),
('Carol White', 'carol@email.com', 'Bulk Order Request', 'I run a small restaurant and am interested in placing bulk orders for vegetables. Do you offer wholesale pricing?'),
('David Green', 'david@email.com', 'Product Suggestion', 'Would you consider adding organic herbs like basil, oregano, and thyme to your product lineup?'),
('Emma Taylor', 'emma@email.com', 'Feedback', 'I recently ordered from your farm and the quality was exceptional! The tomatoes were the best I have ever tasted. Thank you!');

-- Display summary of inserted data
SELECT 'Users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Cart Items', COUNT(*) FROM cart
UNION ALL
SELECT 'Wishlist Items', COUNT(*) FROM wishlist
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Order Items', COUNT(*) FROM order_items
UNION ALL
SELECT 'Contact Messages', COUNT(*) FROM contact_messages;