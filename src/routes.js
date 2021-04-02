const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashBoardController = require('./controllers/DashBoardController')

//-----Envio para as páginas em HTML puro com método sendFile -> sem o uso do template engine-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const basePath = __dirname + '/views'

// routes.get('/', (req, res) => {
//     //Teste para verificar se o servidor está funcionando 
//     // console.log('Teste') 
//     // res.send('Funcionou!!!') 
// })

// routes.get('/', (req, res) => res.sendFile(basePath + '/index.html'))
// routes.get('/job', (req, res) => res.sendFile(basePath + '/job.html'))
// routes.get('/job/edit', (req, res) => res.sendFile(basePath + '/job-edit.html'))
// routes.get('/profile', (req, res) => res.sendFile(basePath + '/profile.html'))
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----Envio para as páginas HTML com template engine com método render() -> com uso do template engine----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
routes.get('/', DashBoardController.index) //Ao acessar o index.html, serão apresentados os valores de dias restantes para encerramento do projeto calculados
routes.get('/job', JobController.create) //Renderizando para jobs.html
routes.post('/job', JobController.save) //Salvando dados do job e redirecionar para o index.html
routes.get('/job/:id', JobController.show) //Mostrando os dados do job
routes.post('/job/:id', JobController.update) //Atualizando os dados do job
routes.post('/job/delete/:id', JobController.delete) //Excluindo um job
routes.get('/profile', ProfileController.index) //Mostrando os dados do perfil
routes.post('/profile', ProfileController.update) //Atualizando os dados do perfil
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = routes