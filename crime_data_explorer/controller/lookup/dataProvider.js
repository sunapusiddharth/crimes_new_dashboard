const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const state = require('../../model/state')

async function getStates(req,res){
    state.find({}).then(data=>{
        logger.info(`Success for GET states ${data}`)
        res.status(200).send(data)
    }).catch(error=>{
        logger.error(`Error for GET states ${error}`)
    })
}

module.exports={
    getStates
}