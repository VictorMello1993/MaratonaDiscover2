const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
    create(req, res){
        return res.render('job')
    },

    async save(req, res) {
        //Como o id é auto-incremento definido pelo banco de dados, não será necessário passar o id como parâmetro
        // const jobs = await Job.get()
        // const lastId = jobs[jobs.length - 1]?.id || 0

        await Job.create({            
            // id: lastId + 1, //Como o id é auto-incremento definido pelo banco de dados, não será necessário passar o id como parâmetro

            name: req.body.name,
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours'],
            created_at: Date.now()
        })        

        return res.redirect('/')
    },

    async show(req, res){
        const jobs = await Job.get()
        const jobId = req.params.id //Obtendo o id do job pelo parâmetro da URL
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        const profile = await Profile.get()

        if(!job){
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render('job-edit', {job})
    },

    async update(req, res){
        const jobId = req.params.id //Obtendo o id do job pelo parâmetro da URL    
    
        //Atualizando os jobs sem usar banco de dados
        // const jobs = await Job.get()
        // const job = jobs.find(job => Number(job.id) === Number(jobId))

        // if(!job){
        //     return res.send('Job not found!')
        // }

        // const newJobs = jobs.map(job => {
        //     if(Number(job.id) === Number(jobId)){
        //         job = updatedJob
        //     }

        //     return job
        // })

        const updatedJob = {
            // ...job,
            
            name: req.body.name,
            "total-hours": req.body['total-hours'],
            "daily-hours": req.body['daily-hours']
        }


        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req, res){        
        const jobId = req.params.id

        await Job.delete(jobId)        

        return res.redirect('/')
    }
}