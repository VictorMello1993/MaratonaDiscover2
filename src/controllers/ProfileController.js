const Profile = require('../models/Profile')

module.exports = {
    index(req, res){
        return res.render('profile', {profile: Profile.get()})        
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

       //Chamando o objeto do model Profile para atualizar os dados do perfil
       Profile.update({
        ...Profile.get(),
        ...req.body,
        'value-hour': valueHour
       }) 

       return res.redirect('/profile')
    }
}