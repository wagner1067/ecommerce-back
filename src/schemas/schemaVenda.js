const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Cliente = require('./schemaCliente');

const Venda = sequelize.define('venda', {
    id_venda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente'
        }
    }
}, {
    tableName: 'venda',
    timestamps: true,
    indexes: [{
        name: 'venda_ibfk_1',
        fields: ['id_cliente']
    }]
});

Venda.sync();

module.exports = Venda;