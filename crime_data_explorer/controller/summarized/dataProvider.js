const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
//in this we will show a UI of chart wherein first show actual wrt year with plots showing states  ,click on state to see year wise x- year and y count 
//filter to narrow based on offense code .
const pe_national = require('../../model/police-employment/national')

async function policeOfficersToPopulation(req, res) {
    try {
        let data = await pe_national.find({}, {
            data_year: 1, pe_ct_per_1000: 1, _id: 0
        }).exec()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    policeOfficersToPopulation,
    peBreakout
}