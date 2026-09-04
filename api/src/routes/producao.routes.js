const express = require('express');

const router = express.Router();

const producaoController = require('../controllers/producao.controllers');

router.post('/cadastrar', producaoController.cadastrar);
router.get('/listar', producaoController.listar);
router.get('/buscar/:id', producaoController.buscar);
router.put('/atualizar/:id', producaoController.atualizar);
router.delete('/excluir/:id', producaoController.excluir);

module.exports = router;