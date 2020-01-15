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

const csvFilePath = __root + '\\data\\hate_crime.csv'
const csv = require('fast-csv')
var hate_crimes = require('../../model/hate_crimes');
const fs = require('fs')

function populateTable(req, res) {
    let data_appended_to_db = []
    res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            // console.log(isNaN(row.ADULT_VICTIM_COUNT) || !row.ADULT_VICTIM_COUNT)
            // process.exit(0)
            row.DATE_YEAR = isNaN(row.DATE_YEAR) || !row.DATE_YEAR ? 0 : parseInt(row.DATE_YEAR)
            row.ADULT_VICTIM_COUNT = isNaN(row.ADULT_VICTIM_COUNT) || !row.ADULT_VICTIM_COUNT ? 0 : parseInt(row.ADULT_VICTIM_COUNT)
            row.JUVENILE_VICTIM_COUNT = isNaN(row.JUVENILE_VICTIM_COUNT) || !row.JUVENILE_VICTIM_COUNT ? 0 :parseInt(row.JUVENILE_VICTIM_COUNT)
            row.TOTAL_OFFENDER_COUNT = isNaN(row.TOTAL_OFFENDER_COUNT) || !row.TOTAL_OFFENDER_COUNT ? 0 :parseInt(row.TOTAL_OFFENDER_COUNT)
            row.ADULT_OFFENDER_COUNT = isNaN(row.ADULT_OFFENDER_COUNT) || !row.ADULT_OFFENDER_COUNT ? 0 :parseInt(row.ADULT_OFFENDER_COUNT)
            row.JUVENILE_OFFENDER_COUNT =isNaN(row.JUVENILE_OFFENDER_COUNT) || !row.JUVENILE_OFFENDER_COUNT ? 0 : parseInt(row.JUVENILE_OFFENDER_COUNT)
            row.VICTIM_COUNT = isNaN(row.VICTIM_COUNT) || !row.VICTIM_COUNT ? 0 :parseInt(row.VICTIM_COUNT)
            // logger.info("row=",row)
            hate_crimes.create(row, function (err, crime) {
                logger.error("err=", err)
                res.write(JSON.stringify({"success":crime}) + '\n');
                logger.info("crime=", crime)
                // process.exit(0)
                if (err) return res.status(500).send(err);
                data_appended_to_db.push(crime)
            })

        })._final((err,data)=>{
            console.log("called from end")
            res.end();
        })
    // res.status(200).send(data_appended_to_db)
}

module.exports = {
    populateTable
}