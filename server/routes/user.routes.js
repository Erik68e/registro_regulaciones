const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.put(':id', userController.actualizarContrasena);

module.exports = router;
