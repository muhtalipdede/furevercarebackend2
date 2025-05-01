const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('appointments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    appointment_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
        allowNull: false
    },
    request_note: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Appointment; 