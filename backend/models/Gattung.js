// models/Gattung.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gattung = sequelize.define("Gattung", {
    GattungID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING,
        unique: true,
    },
});

module.exports = Gattung;
