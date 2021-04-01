const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
    data: {
        name: 'Victor',
        avatar: 'https://avatars.githubusercontent.com/u/35710766?s=400&u=500f959c837b33d5b2f46728969ceace682b65f6&v=4',
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        'value-hour': 75
    },

    controllers: {
        index(req, res){
            return res.render(views + 'profile', {profile: Profile.data})        
        },

        update(req, res){
           //1) Pegar os dados do req.body
            const data = req.body

           //2) Definir quantas semanas tem num ano
           const weeksPerYear = 52

           //3) Remover as semanas de férias, para obter quantas semanas tem em 1 mês
           const weeksPerMonth = (weeksPerYear  - data['vacation-per-year']) / 12

           //4) Total de horas trabalhadas na semana
            const weekTotalHours = data['hours-per-day'] * data['days-per-week']

           //5) Total de horas trabalhadas no mês 
           const monthlyTotalHours = weekTotalHours * weeksPerMonth

           //6) Valor da hora
           const valueHour = data['monthly-budget'] / monthlyTotalHours

           //Atualizando dados do perfil
           Profile.data = {
               ...Profile.data,
               ...req.body,
               'value-hour': valueHour
           }

           return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            created_at: Date.now()            
        },

        {
            id: 2,
            name: "One Two Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()            
        },
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map(job => {

                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
                }
            })

            return res.render(views + 'index', { jobs: updatedJobs })
        },

        create(req, res){
            return res.render(views + 'job')
        },

        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 1

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body['daily-hours'],
                "total-hours": req.body['total-hours'],
                created_at: Date.now()
            })

            return res.redirect('/')
        },

        show(req, res){
            const jobId = req.params.id //Obtendo o id do job pelo parâmetro da URL

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

            return res.render(views + 'job-edit', {job})
        },

        update(req, res){
            const jobId = req.params.id //Obtendo o id do job pelo parâmetro da URL

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body['total-hours'],
                "daily-hours": req.body['daily-hours']
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        }
    },

    services: {
        remainingDays(job) {
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.created_at)

            const dueDay = createdDate.getDate() + Number(remainingDays) //Dia do vencimento
            const dueDateInMs = createdDate.setDate(dueDay) //Data de vencimento

            const timeDiffInMs = dueDateInMs - Date.now()

            //Converter milissegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)

            //Restam x dias
            return dayDiff
        },

        calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }
}

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
routes.get('/', Job.controllers.index) //Ao acessar o index.html, serão apresentados os valores de dias restantes para encerramento do projeto calculados
routes.get('/job', Job.controllers.create) //Renderizando para jobs.html
routes.post('/job', Job.controllers.save) //Salvando dados do job e redirecionar para o index.html
routes.get('/job/:id', Job.controllers.show) //Mostrando os dados do job
routes.post('/job/:id', Job.controllers.update) //Atualizando os dados do job
routes.get('/profile', Profile.controllers.index) //Ao renderizar profile.html, serão enviados os dados do objeto {profile} a ela
routes.post('/profile', Profile.controllers.update) //Atualizando os dados do perfil
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = routes