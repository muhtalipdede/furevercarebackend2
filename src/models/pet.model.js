const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define('pets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vaccination_status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  chip_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Pet; 