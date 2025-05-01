const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Reminder', 'Info', 'System'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Notification; 