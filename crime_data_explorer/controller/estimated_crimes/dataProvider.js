const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const state = require('../../model/state')
const estimated_crimes = require('../../model/estimated_crimes')

async function getStates(req, res) {
    state.find({}).then(data => {
        logger.info(`Success for GET states ${data}`)
        res.status(200).send(data)
    }).catch(error => {
        logger.error(`Error for GET states ${error}`)
    })
}


function getTotalCrimes() {
    return new Promise((resolve, reject) => {
        estimated_crimes.find({ year: 2017 }, {
            population: 1,
            violent_crime: 1,
            homicide: 1,
            rape_leagacy: 1,
            rape_revised: 1,
            robbery: 1,
            aggravated_assualt: 1,
            property_crime: 1,
            burglary: 1,
            larceny: 1,
            motor_vehicle_theft: 1,
            _id: 0
        }).limit(1).then(data => resolve(data)).catch(error => reject(error))
    })
}

function getTotalCrimesTest(req, res) {
    estimated_crimes.find({ year: 2017 }, {
        population: 1,
        violent_crime: 1,
        homicide: 1,
        rape_leagacy: 1,
        rape_revised: 1,
        robbery: 1,
        aggravated_assualt: 1,
        property_crime: 1,
        burglary: 1,
        larceny: 1,
        motor_vehicle_theft: 1,
        _id: 0
    }).limit(1).then(data => res.status(200).send(data)).catch(error => res.status(500).send(error))
}


async function highmapData(req, res) {
    var
        startDate = new Date("2010-10-01"),
        endDate = new Date("2019-10-07");
    var
        arr = new Array(),
        dt = new Date(startDate);

    while (dt <= endDate) {
        let random_number
        if((dt<new Date("2018-10-07") && dt>new Date("2015-10-07")) || (dt<new Date("2013-10-07") && dt>new Date("2012-10-07"))){
            random_number= Math.floor(Math.random() * (13000-1000 +1 ) + 1000)
        }else{
            random_number= Math.floor(Math.random() * (8000-1000 +1 ) + 1000)
        }
        arr.push({
            Date:formatDate(new Date(dt)),
            AnswerCount:random_number
        })
        dt.setDate(dt.getDate() + 1);
    }
    res.status(200).send(arr)
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = {
    getStates,
    getTotalCrimes,
    getTotalCrimesTest,
    highmapData
}