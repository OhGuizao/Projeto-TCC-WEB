const UserController = require('../controller/user.controller.js');
const express = require('express');
const userRoutes = express.Router();

const userController = new UserController();

userRoutes.get('/user',userController.getAll);
userRoutes.post('/user',userController.post);

// Outras rotas podem ser definidas aqui, se necessário

module.exports = userRoutes;
