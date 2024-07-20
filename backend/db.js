const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;
