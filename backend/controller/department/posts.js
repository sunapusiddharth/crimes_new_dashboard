const fetch = require("node-fetch")
const faker = require('faker')
const department_posts = require('../../model/department_posts')
const department_speeches = require('../../model/department_speeches')
const department_vacancies = require('../../model/department_vacancies')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

async function scrapSpeeches(req, res) {
    //scrap data for 20 pages.
    var pageNumberArray = Array.from(Array(134).keys())
    // console.log("array length",pageNumberArray)
    pageNumberArray.map(pageNumber => {
        fetch(`https://www.justice.gov/api/v1/speeches.json?page=${pageNumber}`).then(res => res.json()).then(data => {
            //add data to department_speeches
            data.results && data.results.map(record => {
                // console.log("record=",record)
                // process.exit(0);
                let changed = parseInt(record.changed)
                let created = parseInt(record.created)
                let json_object = {
                    //add component here 
                    attachments: record.attachments,
                    component:record.component && record.component.name,
                    body: record.body,
                    changed: changed ? new Date(changed * 1000) : new Date(),
                    created: created ? new Date(created * 1000) : new Date(),
                    image: record.image && record.image.length ? record.image : faker.image.business(),
                    teaser: record.teaser,
                    title: record.title,
                    url: record.url,
                    location: record.location
                }
                department_speeches.create(json_object).then(result => console.log(`Success in saving dept speeches`)).catch(error => console.log(`Error in saving depts speeches`, error))
            })
        }).catch(error => console.log(error))
    })
}


async function scrapVacancies(req, res) {
    //scrap data for 20 pages.
    var pageNumberArray = Array.from(Array(2).keys())
    // console.log("array length",pageNumberArray)
    pageNumberArray.map(pageNumber => {
        fetch(`https://www.justice.gov/api/v1/vacancy_announcements.json?page=${pageNumber}`).then(res => res.json()).then(data => {
            //add data to department_speeches
            data.results && data.results.map(record => {
                // console.log("record=",record)
                // process.exit(0);
                let changed = parseInt(record.changed)
                let created = parseInt(record.created)
                let json_object = {
                    about_office: record.about_office,
                    application_process: record.application_process,
                    changed: changed ? new Date(changed * 1000) : new Date(),
                    created: created ? new Date(created * 1000) : new Date(),
                    deadline: record.deadline,
                    hiring_office: record.hiring_office,
                    hiring_org: record.hiring_org,
                    language: record.language,
                    job_id: record.job_id,
                    body:record.body,
                    location:record.location,
                    num_positions:record.num_positions,
                    position:record.position,
                    practice_area:record.practice_area,
                    relocation_expenses:record.relocation_expenses,
                    qualifications:record.qualifications,
                    salary:record.salary,
                    title:record.title,
                    travel:record.travel,
                    url:record.url
                }
                department_vacancies.create(json_object).then(result => console.log(`Success in saving dept vacancy announcements`)).catch(error => console.log(`Error in saving depts announcements`, error))
            })
        }).catch(error => console.log(error))
    })
}


function getAllSpeeches(page_number, req, res) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_speeches.find({}).skip(page_number * 20).limit(20).then(result => resolve(result)).catch(error => console.log(`Error in getting department_posts`, error))
    })
}
function getIndividualSpeeches(speech_id) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_speeches.findById(speech_id).then(result => resolve(result)).catch(error => console.log(`Error in getting department_vacancies_single`, error))
    })
}

function getAllVacancies(page_number, req, res) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_vacancies.find({}).skip(page_number * 20).limit(20).then(result => resolve(result)).catch(error => console.log(`Error in getting department_vacancies`, error))
    })
}

function getIndividualVacancies(post_id) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_vacancies.findById(post_id).then(result => resolve(result)).catch(error => console.log(`Error in getting department_vacancies_single`, error))
    })
}

//For POSTS ONLY BELOW:
async function scrapPosts(req, res) {
    //scrap data for 20 pages.
    [1,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ].map(pageNumber => {
        fetch(`https://www.justice.gov/api/v1/blog_entries.json?page=${pageNumber}`).then(res => res.json()).then(data => {
            //add data to department_posts
            data.results && data.results.map(record => {
                // console.log("record=",record)
                // process.exit(0);
                let changed = parseInt(record.changed)
                let created = parseInt(record.created)
                let json_object = {
                    attachments: record.attachments,
                    body: record.body,
                    changed: changed ? new Date(changed * 1000) : new Date(),
                    created: created ? new Date(created * 1000) : new Date(),
                    image: record.image && record.image.length ? record.image : faker.image.business(),
                    teaser: record.teaser,
                    title: record.title,
                    url: record.url,
                }
                department_posts.create(json_object).then(result => console.log(`Success in saving`)).catch(error => console.log(`Error in saving depts`, error))
            })
        }).catch(error => console.log(error))
    })
}

function getAllPosts(page_number, req, res) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_posts.find({}).sort({"created":-1}).skip(page_number * 20).limit(20).then(result => resolve(result)).catch(error => console.log(`Error in getting department_posts`, error))
    })
}

function getIndividualPost(post_id) {
    //convert it to support pagination 
    return new Promise((resolve, reject) => {
        department_posts.findById(post_id).then(result => resolve(result)).catch(error => console.log(`Error in getting department_posts`, error))
    })
}

function addCommentsToPosts(post_id){

}


function addRepliesToComments(comment_id){
    
}






module.exports = {
    getAllPosts,
    getIndividualPost,
    scrapPosts,
    scrapSpeeches,
    scrapVacancies,
    getAllSpeeches,
    getAllVacancies,
    getIndividualVacancies,
    getIndividualSpeeches
}