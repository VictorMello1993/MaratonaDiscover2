let data = [
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
]

module.exports = {
    get(){
        return data
    },
    update(newJob){
        data = newJob
    },
    delete(jobId){
        data = data.filter(job => Number(job.id) !== Number(jobId))        
    }
}