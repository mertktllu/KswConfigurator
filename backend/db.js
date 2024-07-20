require('dotenv').config();
const { Pool } = require('pg');

// Config settings for the PostgreSQL server
const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT
};

// Create a pool of connections
const pool = new Pool(config);

// Export the pool object for use in other modules
module.exports = {
  query: (text, params) => pool.query(text, params),
};
