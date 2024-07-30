const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10, // Maksimum bağlantı sayısı
  idleTimeoutMillis: 30000, // Bağlantının kullanılmadan önce kapanacağı süre
  connectionTimeoutMillis: 2000, // Bağlantı kurmanın zaman aşımı süresi
});

pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
