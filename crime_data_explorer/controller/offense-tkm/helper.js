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

const offenses = ['aggravated-assault','burglary','larceny','motor-vehicle-theft','homicide',
'rape','robbery','arson','violent-crime','property-crime']
// const offenses = ['aggravated-assault']

const offense_ktm_national = require('../../model/offense-tkm/national')
const offense_ktm_state = require('../../model/offense-tkm/state')
const state = require('../../model/state')

async function populateOffenseTkmNational(req, res) {
    
    offenses.map(offense=>{
            logger.info(" offense- ",offense)
            fetch(`${baseUrl}/api/nibrs/${offense}/offense/national/count?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data){
                    console.log(data.length)
                    data.offense_code = offense
                    // process.exit(0)
                    offense_ktm_national.create(data).then(response => {
                        logger.info(`populateTables single record for offense -${offense} -${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for offense -${offense} -${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
            return offense
        })
    res.status(200).send("running in background !!!!!!!")
}



async function populateOffenseTkmState(req, res) {
    let states = await state.find({},{state_abbr:1,_id:0}).limit(100)
    // console.log(agencies)
    // process.exit(0)
    states.map(state_abbr=>{
        offenses.map(offense=>{
            logger.info("start year- ",state_abbr.state_abbr,offense)
            fetch(`${baseUrl}/api/nibrs/${offense}/offense/states/${state_abbr.state_abbr}/count?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.data.length){
                    console.log(data.length)
                    data.offense_code = offense
                    data.state_abbr = state_abbr.state_abbr
                    offense_ktm_state.create(data).then(response => {
                        logger.info(`populateTables single record for state_abbr -${state_abbr.state_abbr} for offense- ${offense}-${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for state_abbr -${state_abbr.state_abbr} for offense- ${offense}-${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
            return offense
        })
        return state_abbr
    })
    res.status(200).send("running in background !!!!!!!")
}

module.exports = {
    populateOffenseTkmNational,
    populateOffenseTkmState
}