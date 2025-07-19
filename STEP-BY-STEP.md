# 🚀 Farm to Table - Step by Step Setup

## After Downloading and Opening in VS Code

### 1. Open Terminal in VS Code
- Press `Ctrl + `` (backtick) to open integrated terminal
- Or go to Terminal → New Terminal

### 2. Check Prerequisites
```bash
# Check if Node.js is installed
node --version
npm --version

# Check if PostgreSQL is installed  
psql --version
```

**If any command fails, install the missing software first!**

### 3. Install Project Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
```bash
# Copy example file
copy .env.example .env    # Windows
cp .env.example .env      # macOS/Linux
```

Edit `.env` file and update the database password:
```env
DB_PASSWORD=your_postgres_password_here
```

### 5. Create Database
```bash
# Connect to PostgreSQL (enter password when prompted)
psql -U postgres

# In PostgreSQL prompt, create database:
CREATE DATABASE farm_to_table;

# Exit PostgreSQL
\q
```

### 6. Setup Database Tables
```bash
# This creates all tables and adds sample data
npm run setup
```

### 7. Start the Application
```bash
# Start both frontend and backend
npm run dev
```

### 8. Open in Browser
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 9. Test Login
- Admin: admin@farmtotable.com / password
- User: john@email.com / password

## 🎉 You're Done!

Your complete Farm to Table application is now running with:
- User authentication
- Product catalog
- Shopping cart
- Admin dashboard
- Order management
- Contact form

## Need Help?

Run the automated setup script:
```bash
# Windows
WINDOWS-QUICK-SETUP.bat

# Or follow the detailed guide
# Read: COMPLETE-SETUP-GUIDE.md
```