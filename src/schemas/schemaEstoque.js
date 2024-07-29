const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Produto = require('./schemaProduto');

const Estoque = sequelize.define('estoque', {
    id_estoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id_produto'
        }
    }
}, {
    tableName: 'estoque',
    timestamps: true,
    indexes: [{
        name: 'estoque_ibfk_1',
        fields: ['id_produto']
    }]
});

Estoque.sync();

module.exports = Estoque;