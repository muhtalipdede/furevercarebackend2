const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Veterinarian = sequelize.define('Veterinarian', {
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
   
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  clinicId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  hooks: {
    beforeSave: async (veterinarian) => {
      if (veterinarian.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        veterinarian.password = await bcrypt.hash(veterinarian.password, salt);
      }
    }
  }
});

Veterinarian.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = Veterinarian; 