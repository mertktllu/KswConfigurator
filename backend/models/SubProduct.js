// models/SubProduct.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubProduct = sequelize.define("SubProduct", {
    SubProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    MainGroupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GattungID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Options: {
        type: DataTypes.STRING,
    },
    InputType: {
        type: DataTypes.STRING,
    },
    InputPlaceholder: {
        type: DataTypes.STRING,
    },
});

module.exports = SubProduct;
