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

const offender_tkm_national_sex = require('../../model/offender-tkm/sex/national')
const offender_tkm_national_relationship = require('../../model/offender-tkm/relationship/national')
const offender_tkm_national_race = require('../../model/offender-tkm/race/national')
const offender_tkm_national_ethnicity = require('../../model/offender-tkm/ethnicity/national')
const offender_tkm_national_count = require('../../model/offender-tkm/count/national')
const offender_tkm_national_age = require('../../model/offender-tkm/age/national')

const state = require('../../model/state')
const variables = ["age", "count", "ethnicity", "race", "sex", "relationship"]


async function populateOffenderTkmNational(req, res) {
    
    offenses.map(offense=>{
            logger.info(" offense- ",offense)
            variables.map(variable=>{
                if (variable =='count') {
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            // process.exit(0)
                            offender_tkm_national_count.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })
                } else if(variable =='sex'){
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            // process.exit(0)
                            offender_tkm_national_sex.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })
                }else if(variable =='race'){
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            // process.exit(0)
                            offender_tkm_national_race.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })  
                }else if(variable =='ethnicity'){
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            offender_tkm_national_ethnicity.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })
                }else if(variable =='age'){
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            offender_tkm_national_age.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })
                }else{
                    fetch(`${baseUrl}/api/nibrs/${offense}/offender/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                        if(data){
                            data.offense_code = offense
                            data.variable = variable
                            offender_tkm_national_relationship.create(data).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                                // res.status(200).send(response)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                                // res.status(500).send(error)
                            })
                        }
                    })
                }
                return variable
            })
           
            return offense
        })
    res.status(200).send("running in background !!!!!!!")
}



async function populateOffenderTkmState(req, res) {
    let states = await state.find({},{state_abbr:1,_id:0}).limit(100)
    // console.log(agencies)
    // process.exit(0)
    states.map(state_abbr=>{
        offenses.map(offense=>{
            logger.info("start year- ",state_abbr.state_abbr,offense)
            fetch(`${baseUrl}/api/nibrs/${offense}/offender/states/${state_abbr.state_abbr}/count?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.data.length){
                    console.log(data.length)
                    data.offense_code = offense
                    data.state_abbr = state_abbr.state_abbr
                    offender_tkm_state.create(data).then(response => {
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
    populateOffenderTkmNational,
    populateOffenderTkmState
}