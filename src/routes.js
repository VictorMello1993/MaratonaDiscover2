const express = require('express')
const routes = express.Router()

const profile = {
    name: 'Victor',
    avatar: 'https://avatars.githubusercontent.com/u/35710766?s=400&u=500f959c837b33d5b2f46728969ceace682b65f6&v=4',    
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

// const basePath = __dirname + '/views'

// routes.get('/', (req, res) => {
//     //Teste para verificar se o servidor está funcionando 
//     // console.log('Teste') 
//     // res.send('Funcionou!!!') 
// })

//Envio para as páginas em HTML puro com sendFile -> sem o uso do template engine
// routes.get('/', (req, res) => res.sendFile(basePath + '/index.html'))
// routes.get('/job', (req, res) => res.sendFile(basePath + '/job.html'))
// routes.get('/job/edit', (req, res) => res.sendFile(basePath + '/job-edit.html'))
// routes.get('/profile', (req, res) => res.sendFile(basePath + '/profile.html'))

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


const views = __dirname + '/views/'

//Envio para as páginas HTML com template engine com render() -> com uso do template engine
routes.get('/', (req, res) => res.render(views + 'index')) 
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', {profile})) //Ao renderizar profile.html, serão enviados os dados do objeto {profile} a ela

module.exports = routes