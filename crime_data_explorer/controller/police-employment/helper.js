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


const police_employment_agency = require('../../model/police-employment/agency')
const police_employment_national = require('../../model/police-employment/national')
const police_employment_state = require('../../model/police-employment/state')
const agency = require('../../model/agency')
const state = require('../../model/state')

async function populatePoliceEmploymentAgency(req, res) {
    let agencies = await agency.find({},{ori:1,_id:0}).limit(100)
    // console.log(agencies)
    // process.exit(0)
    agencies.map(agency=>{
        for(let start_year=2000;start_year<2010;start_year++){
            logger.info("start year- ",start_year,agency.ori)
            fetch(`${baseUrl}/api/police-employment/agencies/${agency.ori}/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    police_employment_agency.create(data.results).then(response => {
                        logger.info(`populateTables single record for agency -${agency.ori} for start year - ${start_year}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for agency -${agency.ori} for start year - ${start_year}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
        }
        return agency
    })
    res.status(200).send("running in background !!!!!!!")
}


async function populatePoliceEmploymentNational(req, res) {
        for(let start_year=2000;start_year<2010;start_year++){
            logger.info("start year- ",start_year)
            fetch(`${baseUrl}/api/police-employment/national/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    police_employment_national.create(data.results).then(response => {
                        logger.info(`populateTables single record for national for start year - ${start_year}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for national for start year - ${start_year}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
        }
    res.status(200).send("running in background !!!!!!!")
}


async function populatePoliceEmploymentStates(req, res) {
    let states = await state.find({},{state_abbr:1,_id:0}).limit(100)
    // console.log(agencies)
    // process.exit(0)
    states.map(state=>{
        for(let start_year=2000;start_year<2010;start_year++){
            logger.info("start year- ",start_year,state.state_abbr)
            fetch(`${baseUrl}/api/police-employment/states/${state.state_abbr}/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    police_employment_state.create(data.results).then(response => {
                        logger.info(`populateTables single record for agency -${state.state_abbr} for start year - ${start_year}-${response}`)
                    }).catch(error => {
                        logger.error(`populateTables single record for agency -${state.state_abbr} for start year - ${start_year}-${error}`)
                    })
                }
            })
        }
        return state
    })
    res.status(200).send("running in background !!!!!!!")
}

module.exports = {
    populatePoliceEmploymentAgency,
    populatePoliceEmploymentNational,
    populatePoliceEmploymentStates
}