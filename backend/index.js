const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL bağlantı ayarları
const pool = new Pool({
  user: 'your_postgres_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Örnek bir endpoint
app.get('/api/customparts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM custom_parts');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error retrieving custom parts');
  }
});

// Sunucuyu dinle
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
