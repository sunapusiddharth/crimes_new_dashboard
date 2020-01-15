const fetch  = require("node-fetch")
const faker = require('faker')
const department_posts  = require('../../model/department_posts')


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

function getBlogPosts(random_number){
    return new Promise((resolve,reject)=>{
        department_posts.find({}).skip(random_number*20).limit(20).then(result=>resolve(result)).catch(error=>console.log(`Error in getting department_posts`,error))
    })
}

function getPressReleases(random_number){
    return new Promise((resolve,reject)=>{
        fetch(`http://www.justice.gov/api/v1/press_releases.json?pagesize=${random_number}`).then(res=>res.json()).then(data=>resolve(data.results)).catch(error=>console.log(error))
    })
}

function getSpeeches(random_number){
    return new Promise((resolve,reject)=>{
        fetch(`http://www.justice.gov/api/v1/speeches.json?pagesize=${random_number}`).then(res=>res.json()).then(data=>resolve(data.results)).catch(error=>console.log(error))
    })
}

function getVacancyAnnouncements(random_number){
    return new Promise((resolve,reject)=>{
        fetch(`http://www.justice.gov/api/v1/vacancy_announcements.json?pagesize=${random_number}`).then(res=>res.json()).then(data=>resolve(data.results)).catch(error=>console.log(error))
    })
}

function getMostWantedPeople(random_number){
    return new Promise((resolve,reject)=>{
        fetch(`https://api.fbi.gov/wanted/v1/list?page=${random_number}`).then(res=>res.json()).then(data=>resolve(data)).catch(error=>console.log(error))
    })
}

function getNews(random_number){
    return new Promise((resolve,reject)=>{
        fetch(`https://newsapi.org/v2/everything?q=fbi&from=2019-07-14&sortBy=publishedAt&apiKey=0d4f370c88594da9885bf9c0f651a9e5&page=${random_number}`).then(res=>res.json()).then(data=>resolve(data)).catch(error=>console.log(error))
    })
}




module.exports={
    getBlogPosts,
    getPressReleases,
    getSpeeches,
    getVacancyAnnouncements,
    getMostWantedPeople,
    getNews
}