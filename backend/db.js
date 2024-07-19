const { Connection, Request } = require('tedious');

// Config settings for the SQL server
const config = {
  server: process.env.DATABASE_SERVER,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
    }
  },
  options: {
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 1433, // Default port 1433
    encrypt: true,
    rowCollectionOnDone: true,
    trustServerCertificate: true,
  }
};

// Create connection to database
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', err => {
  if (err) {
    console.error('Database Connection Failed! Bad Config: ', err);
  } else {
    console.log('Connected to the database');
  }
});

connection.connect();

module.exports = connection;
