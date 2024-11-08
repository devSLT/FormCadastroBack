//validacoes
const validator = require('validator');

const inputsValidacoes = {

    // Prepara Verificacoes Regex && Validator
    validateName: function (name) {
        // Verifica se o nome possui ao menos duas palavras e que cada palavra tenha pelo menos 2 letras
        const nameRegex = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/;
        return nameRegex.test(name.trim());
    },

    validateEmail: function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) && validator.isEmail(email);
    },

    validatePassword: function (password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password) && validator.isLength(password, { min: 8 });
    },

    validateCPF: function (cpf) {
        // Regex para validar que o CPF tem exatamente 11 dígitos numéricos
        const regex = /^\d{11}$/;
        return regex.test(cpf) && validator.isNumeric(cpf) && validator.isLength(cpf, { min: 11, max: 11 });
    }

}

module.exports = inputsValidacoes;