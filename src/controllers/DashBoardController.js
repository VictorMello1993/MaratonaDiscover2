const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()

        //Inicializando os dados dos status com 0.
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //Total de horas por dia de cada job (projeto) que estiver em andamento
        let jobTotalHours = 0

        const updatedJobs = jobs.map(job => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            //Somando a quantidade de status dos projetos no dashboard => acessando pela chave correspondente ao conteúdo da variável 'status'
            statusCount[status] += 1
                        
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours        

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
            
        })

        //Cálculo de horas restantes: Horas que eu trabalho por dia - Total de horas por dia de cada job (projeto) que está em andamento
        const freeHours = profile['hours-per-day'] - jobTotalHours       

        return res.render('index', { jobs: updatedJobs, profile, statusCount, freeHours})
    }
}
