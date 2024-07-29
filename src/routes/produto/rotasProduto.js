const express = require('express');
const router = express.Router();
const schemaProduto = require('../../schemas/schemaProduto');

router.get('/', async (req, res) => {
    const produtos = await schemaProduto.findAll();
    return res.status(200).json(produtos);
});

router.post('/criar', async (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;
        const novoProduto = await schemaProduto.create({ nome, preco, descricao });
        res.status(201).json(novoProduto);
    } catch (error) {
        if (error.parent && error.parent.sqlState) {
        const produtoNaoUnico = error.parent.sqlState
        if (produtoNaoUnico) {
            return res.status(409).json({ message: 'O produto já existe' })
        }}
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const produto = await schemaProduto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send("Produto não encontrado")
        }
        await produto.update(req.body);
        return res.status(200).json(produto)
    } catch (error) {
        const produtoNaoUnico = error.parent.sqlState
        if (produtoNaoUnico) {
            return res.status(409).json({ message: 'O produto já está cadastrado. Por favor, insira um produto diferente.' })
        }
    }
});

router.delete('/deletar/:id', async (req, res) => {
    try {
        const produto = await schemaProduto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send("Produto não encontrado")
        }
        await produto.destroy();
        res.status(200).send("Produto apagado com sucesso");
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;