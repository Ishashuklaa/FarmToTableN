-- Useful Queries for Farm to Table Database

-- 1. Get all products with stock information
SELECT 
    id,
    name,
    category,
    price,
    stock_quantity,
    CASE 
        WHEN stock_quantity = 0 THEN 'Out of Stock'
        WHEN stock_quantity < 10 THEN 'Low Stock'
        ELSE 'In Stock'
    END as stock_status
FROM products
ORDER BY category, name;

-- 2. Get user cart with product details
SELECT 
    u.name as user_name,
    p.name as product_name,
    p.price,
    c.quantity,
    (p.price * c.quantity) as total_price
FROM cart c
JOIN users u ON c.user_id = u.id
JOIN products p ON c.product_id = p.id
ORDER BY u.name, p.name;

-- 3. Get user wishlist with product details
SELECT 
    u.name as user_name,
    p.name as product_name,
    p.price,
    p.category,
    p.stock_quantity
FROM wishlist w
JOIN users u ON w.user_id = u.id
JOIN products p ON w.product_id = p.id
ORDER BY u.name, p.name;

-- 4. Get order details with items
SELECT 
    o.id as order_id,
    u.name as customer_name,
    o.total_amount,
    o.status,
    o.created_at as order_date,
    p.name as product_name,
    oi.quantity,
    oi.price,
    (oi.quantity * oi.price) as item_total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
ORDER BY o.created_at DESC, o.id, p.name;

-- 5. Sales summary by category
SELECT 
    p.category,
    COUNT(oi.id) as items_sold,
    SUM(oi.quantity) as total_quantity,
    SUM(oi.quantity * oi.price) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.category
ORDER BY total_revenue DESC;

-- 6. Top selling products
SELECT 
    p.name,
    p.category,
    p.price,
    SUM(oi.quantity) as total_sold,
    SUM(oi.quantity * oi.price) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name, p.category, p.price
ORDER BY total_sold DESC
LIMIT 10;

-- 7. Customer order summary
SELECT 
    u.name as customer_name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as average_order_value,
    MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.role = 'user'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC;

-- 8. Products that need restocking (low stock)
SELECT 
    name,
    category,
    stock_quantity,
    price
FROM products
WHERE stock_quantity < 20
ORDER BY stock_quantity ASC;

-- 9. Recent contact messages
SELECT 
    name,
    email,
    subject,
    LEFT(message, 100) || '...' as message_preview,
    created_at
FROM contact_messages
ORDER BY created_at DESC
LIMIT 10;

-- 10. Monthly sales report
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- 11. User activity summary
SELECT 
    u.name,
    u.email,
    u.role,
    COUNT(DISTINCT c.id) as cart_items,
    COUNT(DISTINCT w.id) as wishlist_items,
    COUNT(DISTINCT o.id) as total_orders,
    u.created_at as joined_date
FROM users u
LEFT JOIN cart c ON u.id = c.user_id
LEFT JOIN wishlist w ON u.id = w.user_id
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email, u.role, u.created_at
ORDER BY u.created_at DESC;

-- 12. Product performance by category
SELECT 
    category,
    COUNT(*) as total_products,
    AVG(price) as average_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    SUM(stock_quantity) as total_stock
FROM products
GROUP BY category
ORDER BY category;