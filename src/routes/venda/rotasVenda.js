const express = require('express');
const router = express.Router();
const schemaVenda = require('../../schemas/schemaVenda');
const schemaCliente = require('../../schemas/schemaCliente');

router.get('/', async (req, res) => {
    try {
        const venda = await schemaVenda.findAll();
        return res.status(200).json(venda);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar a Venda', error: error.message });
    }
});

router.post('/criar', async (req, res) => {
    try {
        const { total, id_cliente } = req.body;
        const cliente = await schemaCliente.findByPk(id_cliente);
        if (!cliente) {
            return res.status(400).json({ message: 'O Cliente não existe' });
        }
        const venda = await schemaVenda.create({ total, id_cliente });
        return res.status(201).json(venda);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a venda', error: error.message });
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const venda = await schemaVenda.findByPk(req.params.id);
        if (!venda) {
            return res.status(404).send("Estoque não encontrado");
        }
        const cliente = await schemaCliente.findByPk(req.body.id_cliente);
        if (!cliente) {
            return res.status(400).json({ message: 'O cliente não existe' });
        }
        venda.id_cliente = req.body.id_cliente
        venda.total = req.body.total
        await venda.save();
        res.status(200).json(venda);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao editar a venda', error: error.message });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    try {
        const venda = await schemaVenda.findByPk(req.params.id);
        if (!venda) {
            return res.status(404).send("Venda não encontrada");
        }
        await venda.destroy();
        return res.status(200).send("Venda apagada com sucesso");
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar a venda', error: error.message });
    }
});

module.exports = router;