const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

// Define associations (optional, based on requirements)
// User.hasMany(Product);
// Product.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Product,
};
