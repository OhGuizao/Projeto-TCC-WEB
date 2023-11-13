const UserController = require('../controller/user.controller.js');
const express = require('express');
const userRoutes = express.Router();

const userController = new UserController();

userRoutes.get('/user', userController.getAll);
userRoutes.get('/user/:cpfUsuario', userController.getPorCpf); // Correção: Adicionado ":" antes de cpfUsuario
userRoutes.post('/user', userController.post);
userRoutes.put('/user/:idUsuario', userController.put); // Correção: Adicionado ":" antes de idUsuario
userRoutes.delete('/user/:idUsuario', userController.delete);

// Outras rotas podem ser definidas aqui, se necessário

module.exports = userRoutes;
