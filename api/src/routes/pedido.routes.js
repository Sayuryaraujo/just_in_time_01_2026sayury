const express = require('express');

const router = express.Router();

const pedidoController = require('../controllers/pedido.controllers');

router.post('/cadastrar', pedidoController.cadastrar);
router.get('/listar', pedidoController.listar);
router.get('/buscar/:id', pedidoController.buscar);
router.put('/atualizar/:id', pedidoController.atualizar);
router.delete('/excluir/:id', pedidoController.excluir);

module.exports = router;