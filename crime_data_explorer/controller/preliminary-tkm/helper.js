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

const variables = ['DETAILS','POPULATION_GROUP_DETAILS','PERCENT_CHANGE','POPULATION_GROUP','REGION']
// const offenses = ['aggravated-assault']

const preliminary_tkm_national = require('../../model/preliminary-tkm/national')


async function populatePreliminaryTkmNational(req, res) {
    
    variables.map(variable=>{
            logger.info(" variable- ",variable)
            fetch(`${baseUrl}/api/preliminary/national/${variable}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data){
                    console.log(data.length)
                    data.variable = variable
                    // process.exit(0)
                    preliminary_tkm_national.create(data).then(response => {
                        logger.info(`populateTables single record for variable -${variable} -${response}`)
                        // res.status(200).send(response)
                    }).catch(error => {
                        logger.error(`populateTables single record for variable -${variable} -${error}`)
                        // res.status(500).send(error)
                    })
                }
            })
            return variable
        })
    res.status(200).send("running in background !!!!!!!")
}

module.exports = {
    populatePreliminaryTkmNational
}