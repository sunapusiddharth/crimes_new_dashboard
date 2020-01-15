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


const summarized = require('../../model/summarized')
const agency = require('../../model/agency')

async function populateSummarized(req, res) {
    let agencies = await agency.find({},{ori:1,_id:0}).limit(100)
    console.log(agencies)
    // process.exit(0)
    agencies.map(ori=>{
        for(let start_year=2000;start_year<2010;start_year++){
            logger.info("start year- ",start_year,ori.ori)
            fetch(`${baseUrl}/api/summarized/agencies/${ori.ori}/offenses/${start_year}/${start_year+1}?api_key=${secretKey}`).then(res => res.json()).then(data => {
                if(data.results){
                    console.log(data.results.length)
                    // process.exit(0)
                    summarized.create(data.results).then(response => {
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

module.exports = {
    populateSummarized
}