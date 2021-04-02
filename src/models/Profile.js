let data = {
    name: 'Victor',
    avatar: 'https://avatars.githubusercontent.com/u/35710766?s=400&u=500f959c837b33d5b2f46728969ceace682b65f6&v=4',
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    'value-hour': 75    
}

module.exports = {
    get(){
        return data
    },
    update(newData){
        data = newData
    }
}