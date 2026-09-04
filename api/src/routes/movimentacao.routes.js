const express = require('express');

const router = express.Router();

const movimentacaoController = require('../controllers/movimentacao.controllers');

router.post('/cadastrar', movimentacaoController.cadastrar);
router.get('/listar', movimentacaoController.listar);
router.get('/buscar/:id', movimentacaoController.buscar);
router.put('/atualizar/:id', movimentacaoController.atualizar);
router.delete('/excluir/:id', movimentacaoController.excluir);

module.exports = router;