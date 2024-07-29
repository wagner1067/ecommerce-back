const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Produto = sequelize.define('produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'nome'
    },
    preco: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    tableName: 'produto',
    timestamps: true,
    indexes: [{
        name: 'nome',
        unique: true,
        fields: ['nome']
    }]
});

Produto.sync({ alter: true });

module.exports = Produto;