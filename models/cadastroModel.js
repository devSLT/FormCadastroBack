const mongoose = require('mongoose');

/*Definindo um Schema de signup*/
const cadastroSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, },
    cpf: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('UserCadastro', cadastroSchema);