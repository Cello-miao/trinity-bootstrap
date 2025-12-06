const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0 },
  },
}, {
  timestamps: true,
  tableName: 'products',
});

module.exports = Product;

/**
 * CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    createdAt DATETIME,
    updatedAt DATETIME
    );
 */