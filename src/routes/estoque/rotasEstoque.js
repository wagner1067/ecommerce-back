const express = require('express');
const router = express.Router();
const schemaEstoque = require('../../schemas/schemaEstoque');
const schemaProduto = require('../../schemas/schemaProduto');

router.get('/', async (req, res) => {
    try {
        const estoque = await schemaEstoque.findAll();
        return res.status(200).json(estoque);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o estoque', error: error.message });
    }
});

router.post('/criar', async (req, res) => {
    try {
        const { quantidade, id_produto } = req.body;
        const produto = await schemaProduto.findByPk(id_produto);
        if (!produto) {
            return res.status(400).json({ message: 'O produto não existe' });
        }
        let estoque = await schemaEstoque.findOne({ where: { id_produto } });
        if (estoque) {
            estoque.quantidade += +quantidade;
            await estoque.save();
        } else {
            estoque = await schemaEstoque.create({ quantidade: +quantidade, id_produto });
        }
        return res.status(201).json(estoque);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o estoque', error: error.message });
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const estoque = await schemaEstoque.findByPk(req.params.id);
        if (!estoque) {
            return res.status(404).send("Estoque não encontrado");
        }
        const produto = await schemaProduto.findByPk(req.body.id_produto);
        if (!produto) {
            return res.status(400).json({ message: 'O produto não existe' });
        }
        const quantidadeVendida = req.body.quantidade;
        if (estoque.quantidade < quantidadeVendida) {
            return res.status(400).json({ message: 'Não há quantidade suficiente do produto no estoque' });
        }

        estoque.quantidade -= quantidadeVendida;
        await estoque.save();
        return res.status(200).json(estoque);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao editar o estoque', error: error.message });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    try {
        const estoque = await schemaEstoque.findByPk(req.params.id);
        if (!estoque) {
            return res.status(404).send("Estoque não encontrado");
        }
        await estoque.destroy();
        return res.status(200).send("Estoque apagado com sucesso");
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar o estoque', error: error.message });
    }
});

module.exports = router;
