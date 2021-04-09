const Database = require('../db/config')

//Dados fake para simular o retorno dos dados do perfil, sem banco de dados
// let data = {
//     name: 'Victor',
//     avatar: 'https://avatars.githubusercontent.com/u/35710766?s=400&u=500f959c837b33d5b2f46728969ceace682b65f6&v=4',
//     "monthly-budget": 3000,
//     "hours-per-day": 5,
//     "days-per-week": 5,
//     "vacation-per-year": 4,
//     'value-hour': 75    
// }

module.exports = {
    async get(){
        const db = await Database() //Abre o banco de dados

        //get() => Retorna só 1 elemento do banco de dados
        const data = await db.get(`SELECT * FROM profile`)
        
        await db.close()     
        
        //Retornando dados normalizados (substituindo todas as propriedades do objeto que tenham - pelo _, pois o SQLite não aceita colunas cujo nome possuem -)        
        return {
            name: data.name,
            avatar: data.avatar,
            'monthly-budget': data.monthly_budget,
            'days-per-week': data.days_per_week,
            'hours-per-day': data.hours_per_day,
            'vacation-per-year': data.vacation_per_year,
            'value-hour': data.value_hour,
        }
    },

    async update(newData){
        const db = await Database() //Abre o banco de dados

        db.run(`UPDATE profile SET               
                name = "${newData.name}",
                avatar = "${newData.avatar}",
                monthly_budget = ${newData['monthly-budget']},
                days_per_week = ${newData['days-per-week']},
                hours_per_day = ${newData['hours-per-day']},
                vacation_per_year = ${newData['vacation-per-year']},
                value_hour = ${newData['value-hour']}
             `)

        await db.close()

    }
}