# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. `psql` command not found (Windows)

**Problem:** `'psql' is not recognized as an internal or external command`

**Solution:**
1. Find PostgreSQL installation folder (usually `C:\Program Files\PostgreSQL\15\bin`)
2. Add to Windows PATH:
   - Press `Win + R`, type `sysdm.cpl`
   - Advanced tab → Environment Variables
   - System Variables → Path → Edit
   - Add: `C:\Program Files\PostgreSQL\15\bin`
   - Restart VS Code/Terminal

**Alternative:** Use full path:
```bash
"C:\Program Files\PostgreSQL\15\bin\psql" -U postgres
```

### 2. Database Connection Failed

**Problem:** `ECONNREFUSED` or connection timeout

**Solutions:**
```bash
# Check if PostgreSQL is running
# Windows: services.msc → look for postgresql service
# macOS: brew services list | grep postgresql  
# Linux: sudo systemctl status postgresql

# Start PostgreSQL if not running
# Windows: Start service in services.msc
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Test connection
psql -U postgres -h localhost -p 5432
```

### 3. Wrong Password Error

**Problem:** `password authentication failed for user "postgres"`

**Solutions:**
1. Use correct password from PostgreSQL installation
2. Reset PostgreSQL password:
```bash
# Windows (run as admin)
psql -U postgres
\password postgres

# Enter new password twice
```

### 4. Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find and kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Or use different port in .env:
PORT=5001
```

### 5. Module Not Found Errors

**Problem:** `Cannot find module` errors

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache
npm cache clean --force
npm install
```

### 6. Database Tables Not Created

**Problem:** Tables don't exist after running setup

**Solutions:**
```bash
# Check if database exists
psql -U postgres -l

# Recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS farm_to_table;"
psql -U postgres -c "CREATE DATABASE farm_to_table;"

# Run setup again
npm run setup

# Verify tables created
psql -U postgres -d farm_to_table -c "\dt"
```

### 7. Frontend Won't Start

**Problem:** Vite dev server fails to start

**Solutions:**
```bash
# Check if port 5173 is free
# Windows: netstat -ano | findstr :5173
# macOS/Linux: lsof -i :5173

# Clear Vite cache
rm -rf node_modules/.vite
npm run client

# Or use different port
npm run client -- --port 3000
```

### 8. CORS Errors

**Problem:** Cross-origin request blocked

**Solution:** Check `.env` file:
```env
FRONTEND_URL=http://localhost:5173
```

### 9. JWT Token Issues

**Problem:** Authentication not working

**Solutions:**
1. Check JWT_SECRET in `.env`:
```env
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
```

2. Clear browser localStorage:
```javascript
// In browser console
localStorage.clear()
```

### 10. Sample Data Missing

**Problem:** No products or users in database

**Solution:**
```bash
# Re-run setup to add sample data
npm run setup

# Or check if data exists
psql -U postgres -d farm_to_table -c "SELECT COUNT(*) FROM products;"
psql -U postgres -d farm_to_table -c "SELECT COUNT(*) FROM users;"
```

## 🆘 Emergency Reset

If everything is broken, start fresh:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Reset database
psql -U postgres -c "DROP DATABASE IF EXISTS farm_to_table;"
psql -U postgres -c "CREATE DATABASE farm_to_table;"

# 3. Clear node modules
rm -rf node_modules package-lock.json

# 4. Reinstall everything
npm install
npm run setup

# 5. Start fresh
npm run dev
```

## 📞 Still Need Help?

1. Check all prerequisites are installed:
   - Node.js (v14+)
   - PostgreSQL (v12+)
   - Git (optional)

2. Verify file permissions (macOS/Linux):
```bash
sudo chown -R $(whoami) ~/.npm
```

3. Check firewall/antivirus blocking ports 5000, 5173, 5432

4. Try running components separately:
```bash
# Terminal 1
npm run server

# Terminal 2  
npm run client
```

5. Check logs for specific error messages in:
   - VS Code terminal
   - Browser console (F12)
   - Network tab in browser dev tools