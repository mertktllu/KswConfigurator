const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10, // Maksimum bağlantı sayısı
  idleTimeoutMillis: 30000, // Bağlantının kullanılmadan önce kapanacağı süre
  connectionTimeoutMillis: 2000, // Bağlantı kurmanın zaman aşımı süresi
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
