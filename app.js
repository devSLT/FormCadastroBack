require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 7002;
const userRouter = require('./routes/userRouter.js')
const cors = require('cors');

//Conection DB 
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@formcadastro.6vbqi.mongodb.net/?retryWrites=true&w=majority&appName=formCadastro`);

const db = mongoose.connection;

db.on("error", (err) => { console.log(`Houve um erro ao conectar com DB: ${err}`) }); /*Caso ocorra um erro ele avisa*/
db.once("open", () => { console.log(`Banco de dados carregado`) });

//Express
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)

app.listen(PORT, (err) => {
    if (err) {
        return console.log(`Ocorreu um erro ao iniciar o servidor:${err}`)
    }
    console.log(`Servidor rodando na porta: ${PORT}`)
})