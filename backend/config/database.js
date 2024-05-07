// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("DESKTOP-AB3LDT8", null, null, {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustedConnection: true, // Windows Authentication kullanmak için
        },
    },
});

module.exports = sequelize;

