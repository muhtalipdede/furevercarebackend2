const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('documents', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    document_type: {
        type: DataTypes.ENUM('License', 'Certificate', 'Other'),
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Document; 