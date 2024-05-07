// models/MainGroup.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MainGroup = sequelize.define("MainGroup", {
    MainGroupID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING,
        unique: true,
    },
});

module.exports = MainGroup;
