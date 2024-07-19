const sql = require('mssql');

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  server: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  driver: process.env.DATABASE_DRIVER,
  port: parseInt(process.env.DATABASE_PORT),
  options: {
    encrypt: false, // true if you're connecting to an Azure SQL database
    enableArithAbort: true,
  },
};

sql.connect(config, (err) => {
  if (err) {
    console.log('Database Connection Failed! Bad Config: ', err);
  } else {
    console.log('Connected to the database');
  }
});
