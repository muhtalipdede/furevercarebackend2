const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Caregiver = sequelize.define('caregivers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
});

module.exports = Caregiver; 