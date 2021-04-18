module.exports = {
    remainingDays(job) {
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)

        const dueDay = createdDate.getDate() + Number(remainingDays) //Dia do vencimento
        const dueDateInMs = createdDate.setDate(dueDay) //Data de vencimento

        const timeDiffInMs = dueDateInMs - Date.now()

        //Converter milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        //Restam x dias
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}