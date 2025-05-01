const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentInfo = sequelize.define('payment_info', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    card_last_4_digits: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    card_type: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    saved_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = PaymentInfo; 