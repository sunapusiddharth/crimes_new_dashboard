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

const csvFilePath = __root + '\\data\\estimated_crimes.csv'
const csv = require('fast-csv')
var estimated_crimes = require('../../model/estimated_crimes');
const fs = require('fs')

function populateTable(req, res) {
    let data_appended_to_db = []
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            row.year = parseInt(row.year)
            row.state_id = row.state_id?parseInt(row.state_id):0
            row.population = parseInt(row.population)
            row.violent_crime = parseInt(row.violent_crime)
            row.homicide = parseInt(row.homicide)
            row.rape_legacy = parseInt(row.rape_legacy)
            row.rape_revised = parseInt(row.rape_revised)
            row.robbery = parseInt(row.robbery)
            row.aggravated_assault = parseInt(row.aggravated_assault)
            row.property_crime = parseInt(row.property_crime)
            row.burglary = parseInt(row.burglary)
            row.larceny = parseInt(row.larceny)
            row.motor_vehicle_theft = parseInt(row.motor_vehicle_theft)
            // console.log("row=",row)
            estimated_crimes.create(row, function (err, crime) {
                if (err) logger.error("werror in function estimated_crimes ")
                logger.info("success  in function  estimated_crimes")
                data_appended_to_db.push(crime)
            })

        })
    res.status(200).send(data_appended_to_db)
}

module.exports = {
    populateTable
}