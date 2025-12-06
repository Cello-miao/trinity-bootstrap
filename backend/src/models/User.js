const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [6, 100] },
  },
}, {
  timestamps: true,
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
});

// Instance method to compare passwords
User.prototype.comparePassword = async function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = User;
