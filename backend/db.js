const sql = require("mssql/msnodesqlv8");

const config = {
  server: 'DESKTOP-AB3LDT8\\SQLEXPRESS', // Sunucu adı
  database: 'DbMan', // Veritabanı adı
  driver: 'msnodesqlv8', // msnodesqlv8
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
