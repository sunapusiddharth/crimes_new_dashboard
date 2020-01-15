var db = require('../db')
var crimes = require('../model/crimes');
var people = require('../model/people');
var incidentPeople = require('../model/incidentPeople');
var incident = require('../model/incident');
const fs = require('fs')
const Busboy = require('busboy');
const AWS = require('aws-sdk')
var faker = require('faker');
const BUCKET_NAME = 'crimeportal'
const IAM_USER_KEY = 'AKIAUYVA3TWYITB45LF6'
const IAM_USER_SECRET = 'wSgn2l7y4gSt4r5CuIGwJXddzV5FZ+DR8N5xTN4o'

//lorem ipdum:
const LoremIpsum = require("lorem-ipsum").LoremIpsum;


//Steps:
// Pull data from crimes and loop through them 
//generate photos,videos,audios,external_files

var photo_url = 'https://crimeportal.s3-ap-southeast-1.amazonaws.com/'
var video_url = 'https://crimeportal.s3-ap-southeast-1.amazonaws.com/'
var audio_url = 'https://crimeportal.s3-ap-southeast-1.amazonaws.com/'
var files_url = 'https://crimeportal.s3-ap-southeast-1.amazonaws.com/'
var external_files_url = 'https://newsapi.org/s/google-news-api'

//populates incident table depends on ony crime table
async function populateTables() {
    let incident_numbers = []
    let all_crimes = await crimes.find().limit(1000)
    console.log("populate_incident",crimes.length)

    await all_crimes.map(crime => {
        let incident_number = crime.incident_number
        let offense_code_group = crime.offense_code_group
        var photo_urls = [], video_urls = [], audio_urls = [], files_urls = [], external_files = [];
        let ranmon_number = getRandomInt(0, 10)
        for (ranmon_number; ranmon_number <= 10; ranmon_number++) {
            let lorem = loremIpsumGenerator({ sentence_max: 2, sentence_min: 1 }, { words_max: 3, words_min: 1 })
            let media_name = lorem.generateWords(2)
            photo_urls.push({
                media_id: `${incident_number}_media_${ranmon_number}`,
                media_url: `${photo_url}_${ranmon_number}.png`,
                media_name: `photo_${media_name}`
            })
            video_urls.push({
                media_id: `${incident_number}_media_${ranmon_number}`,
                media_url: `${video_url}_${ranmon_number}.mp4`,
                media_name: `photo_${media_name}`
            })
            audio_urls.push({
                media_id: `${incident_number}_media_${ranmon_number}`,
                media_url: `${audio_url}_${ranmon_number}.mp3`,
                media_name: `photo_${media_name}`
            })
            files_urls.push({
                media_id: `${incident_number}_media_${ranmon_number}`,
                media_url: `${files_url}_${ranmon_number}.pdf`,
                media_name: `photo_${media_name}`
            })
            external_files.push(external_files_url)
        }
        //saving data in incident table:
        incident.create({
            incident_number,
            photos: photo_urls,
            videos: video_urls,
            audios: audio_urls,
            files: files_urls,
            external_link: external_files
        }).then(data => console.log(data)).catch(error => console.log(error))
        //next step is to populate the incidentPeople table using incident_number and people table 
    })
    console.log('done')
}

//generates random people information for crime depeneds on no one .
async function populatePeopleTable() {
    //genrate random people.
    try{
        let total_records = 500
        let i =0
    while(i<total_records){
        var name = faker.name.findName(); // Rowan Nikolaus
    let address = `${faker.address.streetName()},${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()}`
    let phone = faker.phone.phoneNumber()
    let email = faker.internet.email()
    let education = await getRandomEducation()
    let employment = await getRandomEmployment()
    let avatar = await faker.image.avatar()
    let photos = photo_url
    let active = 1
    let social_link = ['http://facebook.com','https //instagram.com']
    let prisons = await getRandomPrisons()
    let departments = await getRandomDepartments()
    let is_accussed = faker.random.number(1)
    let is_law = !is_accussed
    let is_suspect = faker.random.number(1)
    let country = faker.address.country()
    let is_witness = faker.random.number(1)
    let crimes_data = await crimes.aggregate().sample(faker.random.number(3)).exec()
    await people.create({
        name,
        address,
        phone,
        email,
        education,
        employment,
        photos,
        social_link,
        prisons,
        departments,
        is_accussed,
        is_law,
        is_suspect,
        country,
        is_witness,
        cases: crimes_data,
        avatar
    })
        i++
    }
    console.log("done")
    }catch(error){
        console.log("erro in ",error)
        throw error 
    }
}

//populates incidentPeoples table depends on crime and people table
async function populateincidentPeopleTable(){
    let all_crimes = await crimes.find().limit(1000)
    try{
        let people_data = await people.find({}).exec()
        await all_crimes.map(async (crime,index) => {
            let incident_number = crime.incident_number
            let random_people_victim = await people.aggregate().sample(faker.random.number(2)).exec()
            let random_people_accussed = await people.aggregate().sample(faker.random.number(3)).exec()
            let random_people_suspects = await people.aggregate().sample(faker.random.number(7)).exec()
            let random_people_law = await people.aggregate().sample(faker.random.number(3)).exec()
            let random_people_judge = await people.aggregate().sample(faker.random.number(1)).exec()
            incidentPeople.create({
                incident_number,
                victims:random_people_victim,
                accussed:random_people_accussed,
                suspects:random_people_suspects,
                law:random_people_law,
                judge:random_people_judge
            })
            console.log(`created record no ${index} out of ${all_crimes.length}`)
        })
        console.log("done !!!!!!......")
    }catch(error){
        console.log(error)
         throw error
        }
}

//helper functions:
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomDepartments() {
    let depts = []
    let random_num = faker.random.number(3)
    let i = 0
    while (i < random_num) {
        depts.push(
            {
                name: faker.random.words(4),
                address: `${faker.address.streetName()},${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()}`,
                from: new Date(faker.date.past()),
                to: new Date(faker.date.past()),
                duration: faker.random.number(10),
                position: faker.name.jobTitle(),
            }
        )
        i++
    }
    return depts
}

function getRandomEducation() {
    let educations = []
    let random_num = faker.random.number(3)
    let i = 0
    while (i < random_num) {
        educations.push(
            {
                education_type: 'School Type',
                from: new Date(faker.date.past()),
                to: new Date(faker.date.past()),
                duration: 3,
                school_name: faker.lorem.words(3),
                qualification_name: faker.lorem.words(2),
                address: `${faker.address.streetName()},${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()}`,
                active: 1
            }
        )
        i++
    }
    return educations
}

function getRandomEmployment() {
    let employments = []
    let random_num = faker.random.number(3)
    let i = 0
    while (i < random_num) {
        employments.push(
            {
                employment_type: faker.name.jobType(),
                title: faker.name.jobTitle(),
                active: 1,
                from: new Date(faker.date.past()),
                to: new Date(faker.date.past()),
                duration: faker.random.number(10),
                address: faker.name.jobArea(),
                company_name: `${faker.company.companySuffix()} ${faker.company.companyName()}`,
            }
        )
        i++
    }
    return employments
}

function getRandomPrisons() {
    let prisons = []
    let random_num = faker.random.number(3)
    let i = 0
    while (i < random_num) {
        prisons.push(
            {
                name: faker.random.words(3),
                from: new Date(faker.date.past()),
                to: new Date(faker.date.past()),
                duration: faker.random.number(10),
                cell_holding: faker.random.words(5),
                supervisor: [{
                    name: faker.name.findName(),
                    external_url: faker.internet.url(),
                    contact_authority: faker.random.words(4)
                }]
            }
        )
        i++
    }
    return prisons
}

function loremIpsumGenerator(sentencesPerParagraph, wordsPerSentence) {
    let { sentence_max, sentence_min } = sentencesPerParagraph
    let { words_max, words_min } = wordsPerSentence
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: sentence_max,
            min: sentence_min
        },
        wordsPerSentence: {
            max: words_max,
            min: words_min
        }
    })
    return lorem
}


module.exports  = {
    loremIpsumGenerator,
    getRandomPrisons,
    getRandomEmployment,
    getRandomEducation,
    getRandomDepartments,
    getRandomInt,
    populateincidentPeopleTable,
    populatePeopleTable,
    populateTables
}