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
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0


const supplemental_agency = require('../../model/supplemental/agency')
const supplemental_national = require('../../model/supplemental/national')
const supplemental_state = require('../../model/supplemental/state')
const agency = require('../../model/agency')
const state = require('../../model/state')

async function populateAgencySupplemental(req, res) {
    let agencies = await agency.find({},{ori:1,_id:0}).limit(100)
    console.log(agencies)
    // process.exit(0)
    agencies.map(ori=>{
        for(let start_year=2000;start_year<2017;start_year++){
            logger.info("start year- ",start_year,ori.ori)
            fetch(`${baseUrl}/api/data/supplemental/agency/${ori.ori}/property_type/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    // process.exit(0)
                    supplemental_agency.create(data.results).then(response => {
                        logger.info(`populateTables single record for ori -${ori} for start year - ${start_year}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for ori -${ori} for start year - ${start_year}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
        }
        return ori
    })
    res.status(200).send("running in background !!!!!!!")
}

async function populateNationalSupplemental(req, res) {
        for(let start_year=2000;start_year<2017;start_year++){
            logger.info("start year- ",start_year)
            fetch(`${baseUrl}/api/data/supplemental/national/property_type/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    // process.exit(0)
                    supplemental_national.create(data.results).then(response => {
                        logger.info(`populateTables single  for start year - ${start_year}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single  for start year - ${start_year}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
        }
    res.status(200).send("running in background !!!!!!!")
}



async function populateStateSupplemental(req, res) {
    let states = await state.find({},{state_abbr:1,_id:0}).limit(100)
    // console.log(agencies)
    // process.exit(0)
    states.map(state_abbr=>{
        for(let start_year=2000;start_year<2010;start_year++){
            logger.info("start year- ",start_year,state_abbr.state_abbr)
            fetch(`${baseUrl}/api/data/supplemental/states/${state_abbr.state_abbr}/property_type/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    // process.exit(0)
                    supplemental_state.create(data.results).then(response => {
                        logger.info(`populateTables single record for state_abbr -${state_abbr.state_abbr} for start year - ${start_year}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for state_abbr -${state_abbr.state_abbr} for start year - ${start_year}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
        }
        return state_abbr
    })
    res.status(200).send("running in background !!!!!!!")
}

module.exports = {
    populateAgencySupplemental,
    populateNationalSupplemental,
    populateStateSupplemental
}