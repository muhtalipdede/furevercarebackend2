const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Availability = sequelize.define('availability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_type: {
        type: DataTypes.ENUM('VetClinic', 'HomeVet', 'Grooming', 'HomeGrooming', 'Hotel', 'Sitter'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

module.exports = Availability; 