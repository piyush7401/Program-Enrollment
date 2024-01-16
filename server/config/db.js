const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from a .env file

const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  connectionString: process.env.DATABASE_PRIVATE_URL
});

module.exports = pool