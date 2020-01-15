const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const pe_national = require('../../model/police-employment/national')

async function policeOfficersToPopulation(req, res) {
    try {
        let data = await pe_national.find({}, {
            data_year: 1, pe_ct_per_1000: 1, _id: 0
        }).sort({data_year:1}).exec()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function peBreakout(req, res) {
    try {
        let data = await pe_national.find({}, {
            data_year: 1,
            civilian_ct: 1,
            female_civilian_ct: 1,
            female_officer_ct: 1,
            female_total_ct: 1,
            male_civilian_ct: 1,
            male_officer_ct: 1,
            male_total_ct:1,
            agency_count_pe_submitting:1,
            _id: 0
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