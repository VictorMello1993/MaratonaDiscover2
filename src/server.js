const express = require('express')
const server = express()
const routes = require('./routes')

//Configuração do EJS para que seja possível utilizar o template engine (ou view engine) para programar em JS dentro do HTML
server.set('view engine', 'ejs')

//Antes de executar as rotas, executar a função middleware use() para habilitar os arquivos estáticos da aplicação que estão na pasta public
server.use(express.static('public'))

//Habilitando o req.body (corpo da requisição), para que seja possível enviar dados para o servidor com método POST
server.use(express.urlencoded({extended: true}))

//Executando as rotas da aplicação
server.use(routes)

//URL base: localhost:3000
server.listen(3000, () => console.log('Loading...'))