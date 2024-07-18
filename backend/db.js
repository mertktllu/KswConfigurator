const sql = require("mssql/msnodesqlv8");

const config = {
  database: process.env.DATABASE_NAME,
  server: process.env.DATABASE_SERVER,
  driver: process.env.DATABASE_DRIVER,
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
