const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('services', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_type: {
        type: DataTypes.ENUM('VetClinic', 'HomeVet', 'Grooming', 'HomeGrooming', 'Hotel', 'Sitter'),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    working_hours: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accepted_pet_types: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available_from: {
        type: DataTypes.DATE,
        allowNull: false
    },
    available_to: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Service; 