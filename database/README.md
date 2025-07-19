# Farm to Table Database Documentation

## Database Overview

This PostgreSQL database supports a complete farm-to-table e-commerce application with user management, product catalog, shopping cart, wishlist, order processing, and contact management.

## Quick Setup

### 1. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE farm_to_table;

# Exit
\q
```

### 2. Run Setup Script
```bash
# Navigate to database folder
cd database

# Run complete setup
psql -U postgres -d farm_to_table -f setup-database.sql
```

### 3. Alternative: Run Individual Scripts
```bash
# Create tables
psql -U postgres -d farm_to_table -f schema.sql

# Insert sample data
psql -U postgres -d farm_to_table -f sample-data.sql
```

## Database Schema

### Tables Overview

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | User accounts | Role-based access (admin/user) |
| `products` | Product catalog | Categories, stock management |
| `cart` | Shopping cart | User-specific cart items |
| `wishlist` | Saved products | User wishlist functionality |
| `orders` | Order records | Status tracking, totals |
| `order_items` | Order details | Individual items per order |
| `contact_messages` | Contact form | Customer inquiries |

### Relationships

```
users (1) -----> (M) cart
users (1) -----> (M) wishlist  
users (1) -----> (M) orders
products (1) ---> (M) cart
products (1) ---> (M) wishlist
products (1) ---> (M) order_items
orders (1) -----> (M) order_items
```

## Sample Data Included

### Users (5 accounts)
- **Admin:** admin@farmtotable.com / password
- **Users:** john@email.com, jane@email.com, mike@email.com, sarah@email.com / password

### Products (20 items)
- **Vegetables:** Tomatoes, Carrots, Spinach, Potatoes, Bell Peppers
- **Fruits:** Apples, Bananas, Strawberries, Oranges, Blueberries  
- **Dairy:** Eggs, Milk, Cheese, Yogurt, Butter
- **Meat:** Beef, Chicken, Pork, Fish, Turkey

### Sample Data
- Cart items for demonstration
- Wishlist items across users
- 5 sample orders with different statuses
- Contact messages for testing

## Key Features

### Security
- Password hashing with bcrypt
- Foreign key constraints
- Check constraints for data validation
- Unique constraints where needed

### Performance
- Indexes on frequently queried columns
- Optimized for common queries
- Proper data types for efficiency

### Data Integrity
- Cascading deletes for related data
- Stock quantity validation
- Price validation (non-negative)
- Status enums for orders

## Common Queries

See `queries.sql` for useful queries including:
- Product inventory management
- Sales reports and analytics
- Customer order history
- Cart and wishlist management
- Contact message handling

## Maintenance

### Backup Database
```bash
pg_dump -U postgres farm_to_table > backup.sql
```

### Restore Database
```bash
psql -U postgres -d farm_to_table < backup.sql
```

### Reset Database
```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE IF EXISTS farm_to_table;"
psql -U postgres -c "CREATE DATABASE farm_to_table;"

# Run setup again
psql -U postgres -d farm_to_table -f setup-database.sql
```

## Environment Variables

Make sure your `.env` file has:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm_to_table
DB_USER=postgres
DB_PASSWORD=your_password
```

## Troubleshooting

### Connection Issues
1. Ensure PostgreSQL is running
2. Check credentials in `.env`
3. Verify database exists: `psql -U postgres -l`

### Permission Issues
```bash
# Grant permissions if needed
psql -U postgres -d farm_to_table -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;"
```

### Check Table Creation
```bash
# List all tables
psql -U postgres -d farm_to_table -c "\dt"

# Check specific table
psql -U postgres -d farm_to_table -c "\d users"
```

Your database is now ready for the Farm to Table application!