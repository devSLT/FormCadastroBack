//Models DB
const UserCadastro = require('../models/cadastroModel.js');
const validacao = require('./validacoes.js');
const bcrypt = require('bcryptjs');

const userController = {

    start: function (req, res) {
        return res.status(200).send('...')
    },

    register: async function (req, res) {

        const { name, email, password, passwordConfirm, cpf, emailConfirm } = req.body;

        if (!name || !email || !password || !cpf || !emailConfirm) {
            return res.status(400).json({ message: 'Preencha os campos corretamente' });
        }

        if (email !== emailConfirm) {
            return res.status(400).json({ message: 'As senhas devem ser iguais' })
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'As senhas devem ser iguais' })
        }

        if (!validacao.validateName(name)) {
            return res.status(400).json({ message: 'Nome Inválido' });
        }

        if (!validacao.validateEmail(email)) {
            return res.status(400).json({ message: 'E-mail inválido' });
        }

        if (!validacao.validatePassword(password)) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        if (!validacao.validateCPF(cpf)) {
            return res.status(400).json({ message: 'CPF inválido' })
        }

        //BCRYPT
        const saltsRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltsRound);

        //Montar dados no Schema
        const userCadastro = new UserCadastro({
            name,
            email,
            cpf,
            password: hashedPassword,
        });

        try {

            //Faz todas as verificacoes simultaneas utilizando a promisse
            const verificarExistencia = async () => {
                const [verificarCadastro] = await Promise.all([
                    UserCadastro.findOne({ $or: [{ name }, { email }, { cpf }, { password }] }),
                ]);

                //O uso do !! retorna boolean
                return !!(verificarCadastro);
            };

            const existeUsuario = await verificarExistencia();

            if (existeUsuario) {
                return res.status(409).json({ message: "Os dados inseridos já estão sendo usados." });
            }

            //Salva o usuario
            await userCadastro.save();

            res.status(200).json({ message: "Usuario salvo com sucesso" })

        } catch (error) {
            // Captura erros ao salvar ou enviar o e-mail
            console.error('Erro ao salvar o usuário:', error);
            res.status(400).json({ message: 'Erro ao processar o cadastro.' });
        }

    },

    login: async function (req, res) {

        const { email, password, } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Preencha os campos corretamente' });
        }

        try {

            const verify = await UserCadastro.findOne({ email });

            if (!verify) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
            }

            // Compare a senha fornecida com a senha armazenada
            const isMatch = await bcrypt.compare(password, verify.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Senha inválida.' });
            }

            return res.status(200).json({ sucess: true, message: "Login Realizado com sucesso" })

        } catch (err) {

            console.error(err);
            res.status(500).json({ message: 'Erro ao efetuar o login' });

        }

    }

}

module.exports = userController;