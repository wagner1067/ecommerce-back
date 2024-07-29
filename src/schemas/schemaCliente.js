const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Cliente = sequelize.define('cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'email'
    },
}, {
    tableName: 'cliente',
    timestamps: true,
    indexes: [{
        name: 'email',
        unique: true,
        fields: ['email']
    }]
});

Cliente.sync({ alter: true });

module.exports = Cliente;