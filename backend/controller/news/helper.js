const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

const csvFilePath1 = __root + '\\data\\articles1.csv'
const csvFilePath2 = __root + '\\data\\articles2.csv'
const csvFilePath3 = __root + '\\data\\articles3.csv'

const csv = require('fast-csv')
const news_articles = require('../../model/news_articles');

const fs = require('fs')

async function populateTableNewsArticles1(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath1)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.year = row.year ?parseInt(row.year):0
                row.month = row.month ? parseInt(row.month) : 0
                row.id = row.id ? parseInt(row.id) : 0
                news_articles.create(row, function (err, docs) {
                    if (err) logger.error("error in function populateTableNewsArticles1 ")
                    // logger.info("success  in function  populateTableNewsArticles")
                    data_appended_to_db.push(docs)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function populateTableNewsArticles2(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath2)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.year = row.year ?parseInt(row.year):0
                row.month = row.month ? parseInt(row.month) : 0
                row.id = row.id ? parseInt(row.id) : 0
                news_articles.create(row, function (err, docs) {
                    if (err) logger.error("error in function populateTableNewsArticles2 ")
                    // logger.info("success  in function  populateTableNewsArticles")
                    data_appended_to_db.push(docs)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}


async function populateTableNewsArticles3(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath3)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.year = row.year ?parseInt(row.year):0
                row.month = row.month ? parseInt(row.month) : 0
                row.id = row.id ? parseInt(row.id) : 0
                news_articles.create(row, function (err, docs) {
                    if (err) logger.error("error in function populateTableNewsArticles3 ")
                    // logger.info("success  in function  populateTableNewsArticles")
                    data_appended_to_db.push(docs)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}


module.exports = {
    populateTableNewsArticles1,
    populateTableNewsArticles2,
    populateTableNewsArticles3

}