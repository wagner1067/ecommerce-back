const express = require('express');
const router = express.Router();
const schemaCliente = require('../../schemas/schemaCliente');

router.get('/', async (req, res) => {
    const clientes = await schemaCliente.findAll();
    return res.status(200).json(clientes);
});

router.post('/criar', async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;
        const novoCliente = await schemaCliente.create({ nome, telefone, email });
        res.status(201).json(novoCliente);
    } catch (error) {
        const emailNaoUnico = error.parent.sqlState
        if (emailNaoUnico) {
            return res.status(409).json({ message: 'O cliente já existe. Por favor, insira um e-mail diferente' })
        }
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const cliente = await schemaCliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).send("Cliente não encontrado")
        }
        await cliente.update(req.body);
        return res.status(200).json(cliente)
    } catch (error) {
        const emailNaoUnico = error.parent.sqlState
        if (emailNaoUnico) {
            return res.status(409).json({ message: 'O email já está cadastrado. Por favor, insira um email diferente.' })
        }
    }
});

router.delete('/deletar/:id', async (req, res) => {
    try {
        const cliente = await schemaCliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).send("Cliente não encontrado")
        }
        await cliente.destroy();
        res.status(200).send("Cliente apagado com sucesso");
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;