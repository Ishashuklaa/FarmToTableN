# Quick Start Guide for Windows

## 🚀 Fast Setup (3 Steps)

### Step 1: Install PostgreSQL
Download and install from: https://www.postgresql.org/download/windows/
- **Remember the postgres user password!**
- Make sure "Command Line Tools" is selected during installation

### Step 2: Run Setup Script
```powershell
# Run the automated setup
setup-windows.bat
```

### Step 3: Start Application
```powershell
npm run dev
```

That's it! Your application will be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔑 Login Credentials
- **Admin:** admin@farmtotable.com / password
- **User:** john@email.com / password

## 📁 Project Structure
```
farm-to-table/
├── backend/           # Node.js/Express API
├── src/              # React frontend
├── database/         # SQL scripts
├── .env             # Environment variables
└── package.json     # Dependencies
```

## 🛠️ Manual Setup (if script fails)

1. **Create Database:**
```powershell
psql -U postgres -c "CREATE DATABASE farm_to_table;"
```

2. **Update .env file** with your postgres password

3. **Install and Setup:**
```powershell
npm install
npm run setup
npm run dev
```

## 🔧 Troubleshooting

**"psql not recognized":**
- Restart PowerShell after PostgreSQL installation
- Add `C:\Program Files\PostgreSQL\15\bin` to PATH

**Database connection error:**
- Check postgres service is running
- Verify password in .env file
- Use pgAdmin GUI as alternative

**Port already in use:**
```powershell
# Kill processes on ports
netstat -ano | findstr :5000
netstat -ano | findstr :5173
# Then kill with: taskkill /PID <PID> /F
```

Need help? Check the detailed WINDOWS-SETUP.md guide!