@echo off
echo ========================================
echo   Farm to Table - Windows Setup
echo ========================================
echo.

echo Step 1: Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and restart this script.
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo.
echo Step 2: Checking PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH!
    echo.
    echo Please install PostgreSQL:
    echo 1. Go to: https://www.postgresql.org/download/windows/
    echo 2. Download and install PostgreSQL
    echo 3. During installation, remember the postgres user password
    echo 4. Make sure "Command Line Tools" is selected
    echo 5. Restart this script after installation
    echo.
    pause
    exit /b 1
)
echo ✅ PostgreSQL is installed

echo.
echo Step 3: Installing project dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo Step 4: Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo ✅ .env file created
    echo.
    echo ⚠️  IMPORTANT: Please edit the .env file and update:
    echo    DB_PASSWORD=your_postgres_password
    echo.
    echo Press any key after updating the .env file...
    pause
) else (
    echo ✅ .env file already exists
)

echo.
echo Step 5: Creating database...
echo Please enter your PostgreSQL postgres user password when prompted:
psql -U postgres -c "CREATE DATABASE farm_to_table;"
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Database might already exist or there was an error.
    echo This is usually fine. Continuing...
)
echo ✅ Database ready

echo.
echo Step 6: Setting up database tables and sample data...
call npm run setup
if %errorlevel% neq 0 (
    echo ERROR: Failed to setup database
    echo.
    echo Please check:
    echo 1. PostgreSQL is running
    echo 2. .env file has correct database password
    echo 3. Database 'farm_to_table' exists
    echo.
    pause
    exit /b 1
)
echo ✅ Database setup complete

echo.
echo ========================================
echo           🎉 SETUP COMPLETE! 🎉
echo ========================================
echo.
echo Your Farm to Table application is ready!
echo.
echo Default login credentials:
echo 👤 Admin: admin@farmtotable.com / password
echo 👤 User:  john@email.com / password
echo.
echo To start the application:
echo   npm run dev
echo.
echo Then open your browser to:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo.
echo Press any key to start the application now...
pause

echo.
echo Starting the application...
call npm run dev