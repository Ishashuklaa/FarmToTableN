# PostgreSQL Installation and Setup for Windows

## Step 1: Install PostgreSQL on Windows

### Option A: Download Official Installer (Recommended)
1. Go to https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download the latest version (PostgreSQL 15 or 16)
4. Run the installer as Administrator
5. During installation:
   - Choose installation directory (default is fine)
   - Select components: PostgreSQL Server, pgAdmin 4, Command Line Tools
   - Set data directory (default is fine)
   - **IMPORTANT:** Set a password for the postgres user (remember this!)
   - Port: 5432 (default)
   - Locale: Default locale

### Option B: Using Chocolatey (if you have it)
```powershell
# Run PowerShell as Administrator
choco install postgresql
```

### Option C: Using Winget
```powershell
# Run PowerShell as Administrator
winget install PostgreSQL.PostgreSQL
```

## Step 2: Verify Installation

After installation, PostgreSQL should be added to your PATH. Test it:

```powershell
# Open new PowerShell window
psql --version
```

If `psql` is not recognized, you need to add it to PATH:

### Add PostgreSQL to PATH manually:
1. Find your PostgreSQL installation (usually `C:\Program Files\PostgreSQL\15\bin`)
2. Add this path to your system PATH environment variable:
   - Press `Win + R`, type `sysdm.cpl`
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System Variables", find "Path" → "Edit"
   - Add: `C:\Program Files\PostgreSQL\15\bin` (adjust version number)
   - Click OK and restart PowerShell

## Step 3: Create Database

Once PostgreSQL is installed and `psql` works:

```powershell
# Connect to PostgreSQL (will prompt for password)
psql -U postgres

# In the PostgreSQL prompt, create database:
CREATE DATABASE farm_to_table;

# Exit PostgreSQL
\q
```

## Step 4: Update Environment Variables

Update your `.env` file with your PostgreSQL password:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm_to_table
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## Step 5: Run Database Setup

```powershell
# Install dependencies
npm install

# Create tables and seed data
npm run setup
```

## Step 6: Start the Application

```powershell
# Start both frontend and backend
npm run dev
```

## Troubleshooting

### If psql still not found:
1. Restart your computer after installation
2. Check if PostgreSQL service is running:
   - Press `Win + R`, type `services.msc`
   - Look for "postgresql-x64-15" (or similar)
   - Make sure it's running

### If connection fails:
1. Check if PostgreSQL is running
2. Verify password in `.env` file
3. Try connecting with pgAdmin (GUI tool installed with PostgreSQL)

### Alternative: Use pgAdmin GUI
If command line doesn't work, you can use pgAdmin:
1. Open pgAdmin 4 from Start Menu
2. Connect to PostgreSQL server (localhost)
3. Right-click "Databases" → "Create" → "Database"
4. Name: `farm_to_table`
5. Save

## Quick Test Commands

```powershell
# Test database connection
psql -U postgres -d farm_to_table -c "SELECT version();"

# List all databases
psql -U postgres -l

# List tables in farm_to_table database
psql -U postgres -d farm_to_table -c "\dt"
```

Your Farm to Table application will be ready once PostgreSQL is installed and the database is created!