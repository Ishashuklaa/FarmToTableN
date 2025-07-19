# PostgreSQL Database Setup Guide

## 1. Install PostgreSQL

### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the 'postgres' user
4. PostgreSQL service should start automatically

### macOS:
```bash
# Using Homebrew (recommended)
brew install postgresql
brew services start postgresql

# Or using MacPorts
sudo port install postgresql14-server
sudo port load postgresql14-server
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Linux (CentOS/RHEL):
```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. Create Database and User

### Option A: Using Command Line
```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Or on Windows/macOS:
psql -U postgres

# Create database
CREATE DATABASE farm_to_table;

# Create a user (optional, you can use postgres user)
CREATE USER farm_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE farm_to_table TO farm_user;

# Exit PostgreSQL
\q
```

### Option B: Using pgAdmin (GUI)
1. Open pgAdmin (comes with PostgreSQL installation)
2. Connect to your PostgreSQL server
3. Right-click "Databases" → "Create" → "Database"
4. Name: `farm_to_table`
5. Click "Save"

## 3. Update Environment Variables

Update your `.env` file with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm_to_table
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 4. Test Database Connection

Test if you can connect to your database:

```bash
# Test connection
psql -h localhost -p 5432 -U postgres -d farm_to_table

# If successful, you should see:
# farm_to_table=#
```

## 5. Run Database Setup

Once PostgreSQL is installed and configured, run:

```bash
# This will create all tables and insert sample data
npm run setup
```

## 6. Verify Database Setup

Connect to your database and check if tables were created:

```bash
psql -U postgres -d farm_to_table

# List all tables
\dt

# You should see:
# users, products, cart, wishlist, orders, order_items, contact_messages

# Check sample data
SELECT * FROM users;
SELECT * FROM products LIMIT 5;

# Exit
\q
```

## Troubleshooting

### Connection Issues:
1. **PostgreSQL not running:**
   ```bash
   # Check if PostgreSQL is running
   sudo systemctl status postgresql  # Linux
   brew services list | grep postgresql  # macOS
   
   # Start if not running
   sudo systemctl start postgresql  # Linux
   brew services start postgresql  # macOS
   ```

2. **Authentication failed:**
   - Make sure you're using the correct username and password
   - Try connecting as 'postgres' user first
   - Check if PostgreSQL is accepting connections

3. **Database doesn't exist:**
   ```bash
   # List all databases
   psql -U postgres -l
   
   # Create database if missing
   psql -U postgres -c "CREATE DATABASE farm_to_table;"
   ```

4. **Port issues:**
   - Default PostgreSQL port is 5432
   - Check if another service is using the port
   - You can change the port in postgresql.conf if needed

### Reset Database:
If you need to reset everything:

```bash
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate database
DROP DATABASE IF EXISTS farm_to_table;
CREATE DATABASE farm_to_table;
\q

# Run setup again
npm run setup
```

## Database Schema Overview

The setup script creates these tables:

1. **users** - User accounts with roles (admin/user)
2. **products** - Farm products with categories and stock
3. **cart** - Shopping cart items for each user
4. **wishlist** - Saved products for later
5. **orders** - Order records with totals and status
6. **order_items** - Individual items within each order
7. **contact_messages** - Messages from contact form

## Sample Data Included

- **Admin user:** admin@farmtotable.com / password
- **Regular users:** john@email.com, jane@email.com / password
- **10 sample products** across different categories
- **Product categories:** vegetables, fruits, dairy, meat

Your database is now ready for the Farm to Table application!