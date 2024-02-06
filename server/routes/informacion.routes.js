const express = require('express');
const router = express.Router();
const informacion = require('../controllers/informacion.controller');

router.get('/', informacion.getInformacion);
router.post('/', informacion.createInformacion);
router.get('/:id', informacion.getInformacionById);
router.put('/:id', informacion.editInformacion);
router.delete('/:id', informacion.deleteInformacion);

module.exports = router;
