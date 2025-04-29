const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Caregiver = sequelize.define('Caregiver', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  services: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  hooks: {
    beforeSave: async (caregiver) => {
      if (caregiver.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        caregiver.password = await bcrypt.hash(caregiver.password, salt);
      }
    }
  }
});

Caregiver.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = Caregiver; 