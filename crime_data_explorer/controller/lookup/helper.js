const config = require('config');
const secretKey = config.get('CDE.secret_key');
const baseUrl = config.get('CDE.baseUrl');

const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

const agency = require('../../model/agency')
const region = require('../../model/region')
const states = require('../../model/state')

function populateAgencies(req, res) {
    fetch(`${baseUrl}/api/agencies/list?api_key=${secretKey}`).then(res => res.json()).then(data => {
        agency.insertMany(data).then(response => {
            logger.info(`populateTables-${response}`)
            res.status(200).send(response)
        }).catch(error => {
            logger.error(`populateTables-${error}`)
            res.status(500).send(error)
        })
    })
}

function populateRegions(req, res) {
    fetch(`${baseUrl}/api/regions?api_key=${secretKey}`).then(res => res.json()).then(data => {
        region.insertMany(data).then(response => {
            logger.info(`populateRegions-${response}`)
            res.status(200).send(response)
        }).catch(error => {
            logger.error(`populateRegions-${error}`)
            res.status(500).send(error)
        })
    })
}

function populateStates(req, res,page) {
    fetch(`${baseUrl}/api/states?api_key=${secretKey}&page=${page}`).then(res => res.json()).then(async data => {
        if (data.pagination.page < data.pagination.pages) {
            states.insertMany(data.results).then(response => {
                logger.info(`populateRegions-${data.pagination.page}`)
                logger.info(`populateRegions-${response}`)
                data.pagination.page +=1
                populateStates(req, res,data.pagination.page)
            }).catch(error => {
                logger.error(`populateRegions-${error}`)
                populateStates(req, res)
            })
        } else {
            states.insertMany(data.results).then(response => {
                logger.info(`populateRegions-${response}`)
                // res.status(200).send(response)
            }).catch(error => {
                logger.error(`populateRegions-${error}`)
                // res.status(500).send(error)
            })
        }
    })
}
module.exports = {
    populateAgencies,
    populateRegions,
    populateStates
}