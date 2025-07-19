# 🌱 Farm to Table - Complete Setup Guide

## 📋 What You'll Build
A complete farm-to-table e-commerce platform with:
- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js with Express.js  
- **Database:** PostgreSQL
- **Features:** User auth, shopping cart, admin panel, product catalog, orders

---

## 🚀 Step-by-Step Setup (Start Here!)

### Step 1: Prerequisites Installation

#### A. Install Node.js
1. Go to https://nodejs.org/
2. Download and install the LTS version
3. Verify installation:
```bash
node --version
npm --version
```

#### B. Install PostgreSQL
**Windows:**
1. Go to https://www.postgresql.org/download/windows/
2. Download PostgreSQL installer (version 15 or 16)
3. Run installer as Administrator
4. During installation:
   - Choose default installation directory
   - Select: PostgreSQL Server, pgAdmin 4, Command Line Tools
   - **IMPORTANT:** Set password for 'postgres' user (remember this!)
   - Port: 5432 (default)
   - Locale: Default

**macOS:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### C. Install VS Code (if not already installed)
1. Download from https://code.visualstudio.com/
2. Install recommended extensions:
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - Auto Rename Tag
   - Bracket Pair Colorizer

---

### Step 2: Project Setup

#### A. Extract and Open Project
1. Extract the downloaded zip file
2. Open VS Code
3. File → Open Folder → Select the extracted project folder
4. Open integrated terminal: `Ctrl + `` (backtick)

#### B. Install Dependencies
```bash
# Install all project dependencies
npm install
```

#### C. Environment Configuration
1. Copy `.env.example` to `.env`:
```bash
# Windows
copy .env.example .env

# macOS/Linux  
cp .env.example .env
```

2. Edit `.env` file with your database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm_to_table
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here

# JWT Configuration  
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

### Step 3: Database Setup

#### A. Create Database
```bash
# Connect to PostgreSQL (will prompt for password)
psql -U postgres

# In PostgreSQL prompt:
CREATE DATABASE farm_to_table;

# Exit PostgreSQL
\q
```

**If `psql` command not found on Windows:**
1. Add PostgreSQL to PATH:
   - Search "Environment Variables" in Windows
   - Edit System Environment Variables
   - Add: `C:\Program Files\PostgreSQL\15\bin` to PATH
2. Restart terminal/VS Code

#### B. Setup Tables and Sample Data
```bash
# This creates all tables and adds sample data
npm run setup
```

**What this does:**
- Creates all database tables (users, products, cart, orders, etc.)
- Adds sample products and users
- Sets up admin and regular user accounts

---

### Step 4: Run the Application

#### A. Start Both Servers
```bash
# Start both frontend and backend simultaneously
npm run dev
```

**Or run separately:**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

#### B. Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Database:** localhost:5432

---

### Step 5: Test the Application

#### Default Login Credentials:
- **Admin:** admin@farmtotable.com / password
- **User:** john@email.com / password

#### Test Features:
1. **Landing Page:** Browse featured products
2. **Shop:** Filter products by category
3. **User Registration:** Create new account
4. **Login:** Test with default credentials
5. **Shopping Cart:** Add/remove products
6. **Wishlist:** Save products for later
7. **Checkout:** Place test orders
8. **Admin Panel:** Manage products and users (admin login)

---

## 📁 Project Structure

```
farm-to-table/
├── backend/                 # Node.js/Express API
│   ├── config/
│   │   └── database.js     # Database connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── routes/             # API endpoints
│   │   ├── auth.js         # Login/register
│   │   ├── products.js     # Product CRUD
│   │   ├── cart.js         # Shopping cart
│   │   ├── wishlist.js     # Wishlist management
│   │   ├── orders.js       # Order processing
│   │   ├── contact.js      # Contact form
│   │   └── admin.js        # Admin operations
│   ├── setup.js            # Database setup script
│   └── server.js           # Main server file
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js          # API service layer
│   └── App.jsx             # Main app component
├── database/               # Database scripts
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── tailwind.config.js      # Tailwind CSS config
```

---

## 🗄️ Database Schema

### Tables Created:
- **users** - User accounts with roles (admin/user)
- **products** - Farm products with categories and stock
- **cart** - Shopping cart items for each user
- **wishlist** - Saved products for later
- **orders** - Order records with totals and status
- **order_items** - Individual items within each order
- **contact_messages** - Messages from contact form

### Sample Data Included:
- 1 Admin user + 4 regular users
- 20 sample products (vegetables, fruits, dairy, meat)
- Sample cart items and orders
- Contact messages for testing

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start frontend only (port 5173)
npm run server       # Start backend only (port 5000)

# Database
npm run setup        # Create tables and seed data

# Production
npm run build        # Build for production
npm run lint         # Run ESLint
```

---

## 🛠️ Troubleshooting

### Database Connection Issues:
```bash
# Check if PostgreSQL is running
# Windows: Check Services (services.msc)
# macOS: brew services list | grep postgresql
# Linux: sudo systemctl status postgresql

# Test connection
psql -U postgres -d farm_to_table -c "SELECT version();"
```

### Port Already in Use:
```bash
# Kill process on port 5000 (backend)
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)  
# Windows: netstat -ano | findstr :5173
# macOS/Linux: lsof -ti:5173 | xargs kill -9
```

### Node Modules Issues:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Reset:
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS farm_to_table;"
psql -U postgres -c "CREATE DATABASE farm_to_table;"
npm run setup
```

---

## 🎯 Next Steps

1. **Customize Products:** Add your own products via admin panel
2. **Styling:** Modify Tailwind classes in components
3. **Features:** Add payment integration, email notifications
4. **Deployment:** Deploy to Heroku, Vercel, or AWS
5. **Testing:** Add unit and integration tests

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure PostgreSQL is running
4. Check `.env` file configuration
5. Look at console errors in browser/terminal

**Common Issues:**
- `psql` not found → Add PostgreSQL to PATH
- Connection refused → Start PostgreSQL service
- Port in use → Kill existing processes
- Module not found → Run `npm install`

---

## ✅ Success Checklist

- [ ] Node.js installed and working
- [ ] PostgreSQL installed and running
- [ ] Project dependencies installed (`npm install`)
- [ ] `.env` file configured with correct database password
- [ ] Database created (`farm_to_table`)
- [ ] Tables created and data seeded (`npm run setup`)
- [ ] Both servers running (`npm run dev`)
- [ ] Can access frontend at http://localhost:5173
- [ ] Can login with default credentials
- [ ] Can browse products and use cart

**🎉 Congratulations! Your Farm to Table application is now running!**