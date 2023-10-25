//Chamando as dependências
require ('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXPRESS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Importar o módulo de conexão com o servidor(EXPRESS).
const express = require("express");

//Vamos usar o servidor express passando como referência a constate app.
const app = express();

//Preparar o servidor para receber dados.
app.use(express.json());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BANCO DE DADOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const mysql = require('mysql2')
const clientDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dbups"
})
//Teste e conexão com o banco de dados.
clientDB.connect((erro) => {
    if (erro) {
      console.error("Erro ao tentar estabelecer conexão" + erro.stack);
      return;
    }
    console.log("Conectado ao banco:" + clientDB.threadId);
  });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SWAGGER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//const swaggerUI = require('swagger-ui-express')
//const swaggerDOCS = require('./swagger.json')
//app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDOCS))
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CORS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Importar o módulo que faz a conexão entre Http e Js(CORS).
const cors = require("cors");

//Aplicar o Cors na aplicação.
app.use(cors());

app.get('/', (req,res)=>{
    res.status(200).send({"msg":"Primeira rota acessada com sucesso"})
})
app.listen(3000, () => console.log("server is running on port 3000"))