const { config } = require('dotenv');
const mysql = require('mysql2/promise');
const Usuario = require('../model/User');

config();

const clientDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

class UserController {

    // PEGAR TODOS OS USUÁRIOS
    async getAll(req, res) {
        try {
            const [usuarios] = await clientDB.query('SELECT * FROM tbusuario');
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }

    async getPorCpf(req, res) {
        try {
            const { cpfUsuario } = req.params;
            // Verificar se o usuário com o CPF fornecido existe
            const [rows] = await clientDB.query('SELECT * FROM tbusuario WHERE cpfUsuario = ?', [cpfUsuario]);

            if (rows.length > 0) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).json({ msg: 'Usuário não encontrado para o CPF fornecido.' });
            }
        } catch (error) {
            console.error('Erro ao buscar usuário por CPF:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }


    // ADICIONAR NOVO USUÁRIO
    async post(req, res) {
        try {
            // Validar dados recebidos
            const { tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password } = req.body;
            if (!tipoUsuario || !nomeUsuario || !cpfUsuario || !idadeUsuario || !user || !password) {
                return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
            }
            // Verificar se o usuário existe
            const [rows] = await clientDB.query('SELECT * FROM tbusuario WHERE cpfUsuario = ?', [cpfUsuario]);
            if (rows.length > 0) {
                return res.status(422).json({ msg: 'Este CPF já está registrado!' });
            }
            // Inserir novo usuário
            const [result] = await clientDB.execute(
                'INSERT INTO tbusuario (tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password) VALUES (?, ?, ?, ?, ?, ?)',
                [tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password]
            );
            const newUser = new Usuario(result.insertId, tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password);
            res.status(201).json({ msg: 'Usuário cadastrado com sucesso!', user: newUser });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }


    // ATUALIZAR USUÁRIO
    async put(req, res) {
        // validação
        const { idUsuario, tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password } = req.body;
        console.log('ID do usuário recebido:', idUsuario);
        if ( !tipoUsuario || !nomeUsuario || !cpfUsuario || !idadeUsuario || !user || !password) {
            return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
        }
        try {
            // Verificar se o usuário existe
            const [rows] = await clientDB.query('SELECT * FROM tbusuario WHERE idUsuario = ?', [idUsuario]);
            console.log('Resultado da consulta ao banco de dados:', rows);
            if (rows.length === 0) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }
            // Update user details
            const [updatedUser] = await clientDB.query('UPDATE tbusuario SET tipoUsuario=?, nomeUsuario=?, idadeUsuario=?, user=?, password=? WHERE idUsuario=?',
                [tipoUsuario, nomeUsuario, idadeUsuario, user, password, idUsuario]);

            res.status(200).json({ msg: 'Usuário atualizado com sucesso!', updatedUser });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }


    // DELETAR USUÁRIO
    async delete(req, res) {
        const { idUsuario } = req.body;
        if (!idUsuario) {
            return res.status(422).json({ msg: 'ID do usuário é obrigatório!' });
        }
        try {
            // Verificar se o usuário existe
            const [rows] = await clientDB.query('SELECT * FROM tbusuario WHERE idUsuario = ?', [idUsuario]);
            if (rows.length === 0) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }
            // Delete the user
            const [deletedUser] = await clientDB.query('DELETE FROM tbusuario WHERE idUsuario=?', [idUsuario]);
            res.status(200).json({ msg: 'Usuário deletado com sucesso!', deletedUser });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    }
}

module.exports = UserController;
