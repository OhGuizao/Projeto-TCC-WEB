//Chamando as dependências
require ('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const swaggerUI = require('swagger-ui-express')
//const swaggerDOCS = require('./swagger.json')

const app = express()

//app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDOCS))

app.listen(3000, () => console.log("server is running on port 3000"))