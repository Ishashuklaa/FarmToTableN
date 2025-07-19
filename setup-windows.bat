@echo off
echo Setting up Farm to Table Database on Windows...
echo.

echo Step 1: Checking if PostgreSQL is installed...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo.
    echo Please install PostgreSQL first:
    echo 1. Go to https://www.postgresql.org/download/windows/
    echo 2. Download and install PostgreSQL
    echo 3. Make sure to remember the postgres user password
    echo 4. Restart this script after installation
    echo.
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

echo Step 2: Creating database...
echo Please enter your PostgreSQL postgres user password when prompted:
psql -U postgres -c "CREATE DATABASE farm_to_table;"

if %errorlevel% neq 0 (
    echo ERROR: Failed to create database
    echo Make sure PostgreSQL is running and password is correct
    pause
    exit /b 1
)

echo Database created successfully!
echo.

echo Step 3: Installing Node.js dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo Step 4: Setting up database tables and sample data...
call npm run setup

if %errorlevel% neq 0 (
    echo ERROR: Failed to setup database
    echo Make sure your .env file has correct database credentials
    pause
    exit /b 1
)

echo.
echo ✅ Setup completed successfully!
echo.
echo Default login credentials:
echo Admin: admin@farmtotable.com / password
echo User: john@email.com / password
echo.
echo To start the application, run: npm run dev
echo.
pause