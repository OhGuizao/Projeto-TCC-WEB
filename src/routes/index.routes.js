const express = require('express');
const userRoutes = require('./user.routes.js');

const mainRoutes = express.Router();

const allRoutes = [mainRoutes, userRoutes];

module.exports = allRoutes;
