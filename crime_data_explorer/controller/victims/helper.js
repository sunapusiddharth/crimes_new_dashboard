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


const victims_agency_age = require('../../model/victims/age/agency')
const victims_agency_count = require('../../model/victims/count/agency')
const victims_agency_ethnicity = require('../../model/victims/ethnicity/agency')
const victims_agency_race = require('../../model/victims/race/agency')
const victims_agency_relationship = require('../../model/victims/relationship/agency')
const victims_agency_sex = require('../../model/victims/sex/agency')


const victims_national_age = require('../../model/victims/age/national')
const victims_national_count = require('../../model/victims/count/national')
const victims_national_ethnicity = require('../../model/victims/ethnicity/national')
const victims_national_race = require('../../model/victims/race/national')
const victims_national_relationship = require('../../model/victims/relationship/national')
const victims_national_sex = require('../../model/victims/sex/national')

const agency = require('../../model/agency')
const state = require('../../model/state')


const offenses = [
    "aggravated-assault", "all-other-larceny", "all-other-offenses", "animal-cruelty", "arson", "assisting-or-promoting-prostitution",
    "bad-checks", "betting", "bribery", "burglary-breaking-and-entering", "counterfeiting-forgery", "credit-card-automated-teller-machine-fraud",
    "destruction-damage-vandalism-of-property", "driving-under-the-influence", "drug-equipment-violations",
    "drug-violations", "drunkenness", "embezzlement", "extortion-blackmail", "false-pretenses-swindle-confidence-game",
    "fondling", "gambling-equipment-violation", "hacking-computer-invasion", "human-trafficking-commerical-sex-acts",
    "human-trafficking-commerical-involuntary-servitude", "identity-theft,impersonation", "incest,intimidation",
    "justifiable-homicide", "kidnapping-abduction", "motor-vehicle-theft", "murder-and-nonnegligent-manslaughter",
    "negligent-manslaughter", "operating-promoting-assiting-gambling", "curfew-loitering-vagrancy-violations",
    "peeping-tom", "pocket-picking", "pornography-obscence-material", "prostitution", "purchasing-prostitution",
    "purse-snatching", "rape", "robbery", "sexual-assult-with-an-object", "sex-offenses-non-forcible", "shoplifting",
    "simple-assault", "sodomy", "sports-tampering", "statutory-rape", "stolen-property-offenses", "theft-from-building",
    "theft-from-coin-operated-machine-or-device", "theft-from-motor-vehicle", "theft-of-motor-vehicle-parts-or-accessories",
    "theft-from-motor-vehicle", "weapon-law-violation", "welfare-fraud", "wire-fraud", "not-specified",
    "liquor-law-violations", "crime-against-person", "crime-against-property", "crime-against-society",
    "assault-offenses", "homicide-offenses", "human-trafficking-offenses", "sex-offenses", "sex-offenses-non-forcible",
    " fraud-offenses", "larceny-theft-offenses", "drugs-narcotic-offenses", "gambling-offenses", "prostitution-offenses",
    "all-offenses"
]

// const offenses = ["aggravated-assault"]

const variables = ["age", "count", "ethnicity", "race", "sex", "relationship"]

async function populateVictimsAgency(req, res) {
    
        offenses.map(offense => {
            variables.map(variable => {
                fetch(`${baseUrl}/api/data/nibrs/${offense}/victim/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                    if (data.results.length) {
                        data.offense_code = offense
                        console.log(data.results.length)
                        if(variable == 'sex'){
                            victims_agency_sex.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }else if(variable == 'age'){
                            victims_agency_age.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }else if(variable == 'count'){
                            victims_agency_count.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }else if(variable == 'ethnicity'){
                            victims_agency_ethnicity.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }else if(variable == 'relationship'){
                            victims_agency_relationship.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }else if(variable == 'race'){
                            victims_agency_race.create(data.results).then(response => {
                                logger.info(`populateTables single record for offense -${offense} -${response}`)
                            }).catch(error => {
                                logger.error(`populateTables single record for offense -${offense} -${error}`)
                            })
                        }
                    }
                })
                return variable
            })
            return offense
        })
    res.status(200).send("running in background !!!!!!!")
}


async function populateVictimsNational(req, res) {    
    offenses.map(offense => {
        variables.map(variable => {
            fetch(`${baseUrl}/api/data/nibrs/${offense}/victim/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(async data => {
                if (data.results.length) {
                    let final_data = await data.results.map(record=>{
                        return {...record,offense_code:offense}
                    })
                    // console.log(data.results.length,data.results.offense)
                    if(variable == 'sex'){
                        victims_national_sex.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }else if(variable == 'age'){
                        victims_national_age.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }else if(variable == 'count'){
                        victims_national_count.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }else if(variable == 'ethnicity'){
                        victims_national_ethnicity.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }else if(variable == 'relationship'){
                        victims_national_relationship.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }else if(variable == 'race'){
                        victims_national_race.create(final_data).then(response => {
                            logger.info(`populateTables single record for offense -${offense} -${response}`)
                        }).catch(error => {
                            logger.error(`populateTables single record for offense -${offense} -${error}`)
                        })
                    }
                }
            })
            return variable
        })
        return offense
    })
res.status(200).send("running in background !!!!!!!")
}

module.exports = {
    populateVictimsNational,
    populateVictimsAgency
}