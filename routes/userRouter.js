const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController.js')

//Rotas

router.get('/', userController.start)

//cadastro
router.post('/cadastro', userController.register)

//login
router.post('/login', userController.login)

module.exports = router