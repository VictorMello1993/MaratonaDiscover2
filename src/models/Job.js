const Database = require('../db/config')

//Dados fake para simular o retorno dos dados do job, sem banco de dados
// let data = [
//     {
//         id: 1,
//         name: "Pizzaria Guloso",
//         "daily-hours": 2,
//         "total-hours": 60,
//         created_at: Date.now()            
//     },

//     {
//         id: 2,
//         name: "One Two Project",
//         "daily-hours": 3,
//         "total-hours": 47,
//         created_at: Date.now()            
//     },
// ]

module.exports = {
    async get() {
        const db = await Database()

        //all() => Retorna todos os elementos do banco de dados
        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => {
            return {
                id: job.id,
                name: job.name,
                'daily-hours': job.daily_hours,
                'total-hours': job.total_hours,
                created_at: job.created_at
            }
        })
    },

    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE jobs SET 
                            name = "${updatedJob.name}",
                            daily_hours = ${updatedJob['daily-hours']},
                            total_hours = ${updatedJob['total-hours']}                            
                      WHERE id = ${jobId}`)

        await db.close()

        // data = updatedJob
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()

        //Simulando a exclusão dos jobs sem banco de dados
        // data = data.filter(job => Number(job.id) !== Number(jobId))
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs 
                             (name, daily_hours, total_hours,
                              created_at)VALUES 
                              ('${newJob.name}',
                                ${newJob['daily-hours']},
                                ${newJob['total-hours']},
                                ${newJob.created_at})`);

        await db.close()
    }
}
