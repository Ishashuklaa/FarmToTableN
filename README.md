# Farm to Table - Full Stack Application

A complete farm-to-table e-commerce platform built with React.js, Node.js, Express.js, and PostgreSQL.

## Features

### Frontend (React.js)
- **Landing Page** - Featured products and company intro
- **User Dashboard** - Profile, orders, and wishlist management
- **Admin Dashboard** - Product and user management
- **Shop Page** - Product catalog with categories and search
- **Cart Page** - Shopping cart with quantity management
- **Wishlist Page** - Save products for later
- **Checkout** - Complete order placement system
- **Product Details** - Detailed product information
- **Contact Page** - Contact form with message storage

### Backend (Node.js/Express)
- **Authentication** - JWT-based signup/login
- **Admin Routes** - CRUD operations for products and users
- **Cart/Wishlist** - Add, update, delete items
- **Product Routes** - List, filter, and single product views
- **Order Management** - Order placement and tracking
- **Contact API** - Store contact messages

### Database (PostgreSQL)
- Users with role-based access (admin/user)
- Products with categories and stock management
- Shopping cart and wishlist tables
- Orders with order items tracking
- Contact messages storage

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git

### 1. Database Setup

First, install and start PostgreSQL on your system:

**Windows:**
```bash
# Download and install PostgreSQL from https://www.postgresql.org/download/windows/
# Start PostgreSQL service
```

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

### 2. Create Database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE farm_to_table;

# Exit PostgreSQL
\q
```

### 3. Project Setup

1. **Clone or download the project**
2. **Install dependencies:**

```bash
# Install all dependencies
npm install
```

3. **Environment Configuration:**

Copy the `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm_to_table
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup and Seeding

Run the setup script to create tables and seed data:

```bash
npm run setup
```

This will:
- Create all necessary database tables
- Insert sample products
- Create admin and user accounts

### 5. Running the Application

Start both backend and frontend servers:

```bash
# Start both servers concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development server
npm run client
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### Default Login Credentials

**Admin Account:**
- Email: admin@farmtotable.com
- Password: password

**User Account:**
- Email: john@email.com
- Password: password

## Project Structure

```
farm-to-table/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product management
│   │   ├── cart.js              # Shopping cart
│   │   ├── wishlist.js          # Wishlist management
│   │   ├── orders.js            # Order processing
│   │   ├── contact.js           # Contact form
│   │   └── admin.js             # Admin operations
│   ├── setup.js                 # Database setup and seeding
│   └── server.js                # Main server file
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation component
│   │   ├── Footer.jsx           # Footer component
│   │   ├── ProductCard.jsx      # Product display card
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── contexts/
│   │   ├── AuthContext.jsx      # Authentication context
│   │   └── CartContext.jsx      # Cart/wishlist context
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Shop.jsx             # Product catalog
│   │   ├── ProductDetail.jsx    # Product details
│   │   ├── Cart.jsx             # Shopping cart
│   │   ├── Wishlist.jsx         # Wishlist page
│   │   ├── Checkout.jsx         # Checkout process
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── AdminDashboard.jsx   # Admin panel
│   │   ├── Contact.jsx          # Contact page
│   │   ├── Login.jsx            # Login page
│   │   └── Register.jsx         # Registration page
│   ├── services/
│   │   └── api.js               # API service layer
│   └── App.jsx                  # Main app component
├── package.json
├── tailwind.config.js           # Tailwind CSS configuration
└── .env.example                 # Environment variables template
```

## Database Schema

### Users Table
- id (Primary Key)
- name, email, password
- phone, address
- role (admin/user)
- created_at

### Products Table
- id (Primary Key)
- name, description, price
- category, image_url
- stock_quantity
- created_at

### Cart Table
- id (Primary Key)
- user_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- created_at

### Wishlist Table
- id (Primary Key)
- user_id (Foreign Key)
- product_id (Foreign Key)
- created_at

### Orders Table
- id (Primary Key)
- user_id (Foreign Key)
- total_amount, status
- shipping_address
- created_at

### Order Items Table
- id (Primary Key)
- order_id (Foreign Key)
- product_id (Foreign Key)
- quantity, price
- created_at

### Contact Messages Table
- id (Primary Key)
- name, email, subject, message
- created_at

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run client` - Start frontend only
- `npm run server` - Start backend only
- `npm run setup` - Setup database and seed data
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

### Cart
- GET `/api/cart` - Get user cart
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:id` - Update cart item
- DELETE `/api/cart/:id` - Remove from cart

### Wishlist
- GET `/api/wishlist` - Get user wishlist
- POST `/api/wishlist` - Add to wishlist
- DELETE `/api/wishlist/:id` - Remove from wishlist

### Orders
- GET `/api/orders` - Get user orders
- POST `/api/orders` - Create order

### Contact
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get messages (Admin)

### Admin
- GET `/api/admin/stats` - Dashboard statistics
- GET `/api/admin/users` - Get all users
- GET `/api/admin/orders` - Get all orders

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists: `psql -U postgres -l`

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Permission Issues
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.