const { config } = require('dotenv');
const mysql = require('mysql2/promise'); // Usando a versão Promise do mysql2

config();

const clientDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

const User = require('../model/User');

class UserController {


    //PEGAR TODOS OS USUÁRIOS
    async getAll(req, res) {
        try {
            const [usuario] = await clientDB.query('SELECT * FROM tbusuario');
            console.log(usuario);
            res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }

    async post(req, res) {
        //validação
        const { user, password, cpfUsuario } = req.body;
        if (!user) {
            return res.status(422).json({ msg: 'Usuário é obrigatório!' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'Senha é obrigatória!' })
        }
        if (!cpfUsuario) {
            return res.status(422).json({ msg: 'Cpf é obrigatório!' })
        }

        //check if user exists
        const userExists = await User.findOne({ cpfUsuario: cpfUsuario });
        if(userExists){
            return res.status(422).json({msg:'Este cpf já está registrado!'})
        }
    }
}

module.exports = UserController;
