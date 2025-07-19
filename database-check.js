import pool from './backend/config/database.js';

const checkDatabase = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time:', result.rows[0].now);
    
    // Check if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 Existing tables:');
    if (tables.rows.length === 0) {
      console.log('❌ No tables found! Run "npm run setup" to create tables.');
    } else {
      tables.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }
    
    // Check users table specifically
    try {
      const userCount = await pool.query('SELECT COUNT(*) FROM users');
      console.log(`\n👥 Users in database: ${userCount.rows[0].count}`);
    } catch (error) {
      console.log('\n❌ Users table not found or accessible');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check your .env file has correct database credentials');
    console.error('3. Verify database "farm_to_table" exists');
    console.error('4. Run: psql -U postgres -c "CREATE DATABASE farm_to_table;"');
  } finally {
    process.exit(0);
  }
};

checkDatabase();