const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const fetch = require('node-fetch')
const faker = require('faker')
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

const crime_news = require('../../model/crime_news');

const fs = require('fs')
var url = 'https://newsapi.org/v2/everything?q=fbi&sortBy=publishedAt&apiKey=0d4f370c88594da9885bf9c0f651a9e5'
var CurrentDate = new Date();
CurrentDate.setDate(CurrentDate.getDate() + 1);
const pastDayDate = `${CurrentDate.getFullYear()}-${CurrentDate.getMonth()}-${CurrentDate.getDate()}`

function getContacts(category){
    // console.log("pastMonthDate",pastDayDate)
        // process.exit(0)
    let contacts = []; // this array will contain all contacts
    console.log("in fn ....")
    const getContactsPage = page => fetch(
        'https://newsapi.org/v2/everything?q='+category+'&sortBy=publishedAt&apiKey=0d4f370c88594da9885bf9c0f651a9e5' + '&from='+ pastDayDate + '&page=' + page
    ).then(res=>res.json()).then(async response => {
        let res_url = 'https://newsapi.org/v2/everything?q='+category+'&sortBy=publishedAt&apiKey=0d4f370c88594da9885bf9c0f651a9e5' + '&from='+ pastDayDate + '&page=' + page
        // console.log("response",response)
        // process.exit(0)
        // add the contacts of this response to the array
        contacts = contacts.concat(response.articles)
        let result_count = response.articles.length
        // if (page <= (response.totalResults/result_count)) {
            if (page <= 5) { //adding this limit since newsApi doesn't allow mor than 100 results.
            console.log("response for page=",page)
            console.log("url=",res_url)
           await response.articles.map(async article=>{
                article.tags = category
                article.hits = 0
                article.full_content = await faker.lorem.paragraphs(50)
                crime_news.create(article).then(res=>{
                    logger.info("Successfully created docs = ",result_count)
                }).catch(error=>{
                    logger.error("Error in creating doc",error)
                })
            })
            page++
            return getContactsPage(page);
        } else {
            // this was the last page, return the collected contacts
            return contacts;
        }
    });

    // start by loading the first page
    return getContactsPage(1);
}

async function populateTableCrimeNews(req,res){
    try {
        categories = [
            'rape',
            'murder',
            'assault',
            'homicide',
            'fbi',
            'doj',
            'theft',
            'arrests',
            'terrorism',
            'victims',
            'Abuse',
            'Agency',
            'Arson',
            'Assailant',
            'assault',
            'autopsy',
            'chase',
            'burglary',
            'blackmail',
            'bombing',
            'brawl',
            'dea',
            'extradition',
            'felony',
            'firebombing',
            'hijack',
            'immunity',
            'imprison',
            'hostage',
            'interrogate',
            'intruder',
            'investigation',
            'judiciary',
            'juvenile',
            'kidnapping'
        ]
        let promises = []
        categories.map(category=>{
            promises.push(getContacts(category))
        })
        let data = await Promise.all(promises)
        res.status(200).send(data.length)
    } catch (error) {
        console.log("error2=",error)
        res.status(500).send(error)
    }
}




module.exports = {
    populateTableCrimeNews,

}



//fn to add random hits :
// db.crime_news.find().forEach(function(mydoc) {
//     db.crime_news.update({_id: mydoc._id}, {$set: {hits:Math.floor(Math.random() * (3000-1000 +1 ) + 100) }})
//   })