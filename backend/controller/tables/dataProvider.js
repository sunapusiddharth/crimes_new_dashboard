const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}

const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.log("Error " + err);
});


const logger = new winston.createLogger(myWinstonOptions)
const boston_crimes_data = require('../../model/boston_crime_data');
const california_law_enforcement_byAgency = require('../../model/california_law_enforcement_byAgency');
const california_law_enforcement_by_city = require('../../model/california_law_enforcement_by_city');
const california_law_enforcement_by_county = require('../../model/california_law_enforcement_by_county');
const california_law_enfrcement_by_campus = require('../../model/california_law_enfrcement_by_campus');
const denver_crime_data = require('../../model/denver_crime_data');
const vancouver_crime_data = require('../../model/vancouver_crime_data')
const baltimore_crimes = require('../../model/baltimore_crimes')
const dc_metro_crime = require('../../model/dc_metro_crime')

async function bostonCrimesTable(req, res) {
    try {
        let filters = req.body.filters
        let sort = req.body.sort
        let perPage = req.body.limit
        let skipPage = req.body.skipPage * perPage
        // project.passing_scores = 0
        Object.keys(filters).map(key => {
            filters[key] = new RegExp(filters[key])
        })
        let docs = []
        let aggregation_array = []
        aggregation_array = [
            {
                $match: filters,
            },
            {
                $sort: sort
            },
            {
                $facet: {
                    paginatedResults: [{ $skip: skipPage }, { $limit: perPage }],
                    totalCount: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ]
        cursor = boston_crimes_data.aggregate(aggregation_array)
            .allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        await cursor.eachAsync(data => docs.push(data));
        logger.info("Success in fucntion :", aggregation_array)
        res.status(200).send(docs)
    } catch (error) {
        logger.error("Error in fucntion :", error)
        res.status(500).send(error)
    }

    // boston_crimes_data.find(filters).sort(sort).limit(limit).then(result => {
    //     logger.info("Success in fn bostonCrimesTable", result)
    //     res.status(200).send(result)
    // }).catch(error => {
    //     logger.error("Error in fn bostonCrimesTable", error)
    //     res.status(500).send(error)
    // })
}

async function californiaLawEnforcementByAgency(req, res) {
    california_law_enforcement_byAgency.find({}).then(result => {
        logger.info("Success in fn ", result.length)
        res.status(200).send(result)
    }).catch(error => {
        logger.error("Error in fn ", error)
        res.status(500).send(error)
    })
}

async function californiaLawEnforcementByCity(req, res) {
    california_law_enforcement_by_city.find({}).then(result => {
        logger.info("Success in fn ", result.length)
        res.status(200).send(result)
    }).catch(error => {
        logger.error("Error in fn ", error)
        res.status(500).send(error)
    })
}

async function californiaLawEnforcementByCounty(req, res) {
    california_law_enforcement_by_county.find({}).then(result => {
        logger.info("Success in fn ", result.length)
        res.status(200).send(result)
    }).catch(error => {
        logger.error("Error in fn ", error)
        res.status(500).send(error)
    })
}
async function californiaLawEnforcementByCampus(req, res) {
    california_law_enfrcement_by_campus.find({}).then(result => {
        logger.info("Success in fn ", result.length)
        res.status(200).send(result)
    }).catch(error => {
        logger.error("Error in fn ", error)
        res.status(500).send(error)
    })
}

async function denverCrimeTable(req, res) {
    try {
        let filters = req.body.filters
        let sort = req.body.sort
        let perPage = req.body.limit
        let skipPage = req.body.skipPage * perPage
        // project.passing_scores = 0
        Object.keys(filters).map(key => {
            filters[key] = new RegExp(filters[key])
        })
        let docs = []
        let aggregation_array = []
        aggregation_array = [
            {
                $match: filters,
            },
            {
                $sort: sort
            },
            {
                $facet: {
                    paginatedResults: [{ $skip: skipPage }, { $limit: perPage }],
                    totalCount: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ]
        cursor = denver_crime_data.aggregate(aggregation_array)
            .allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        await cursor.eachAsync(data => docs.push(data));
        logger.info("Success in fucntion :", aggregation_array)
        res.status(200).send(docs)
    } catch (error) {
        logger.error("Error in fucntion :", error)
        res.status(500).send(error)
    }

    // boston_crimes_data.find(filters).sort(sort).limit(limit).then(result => {
    //     logger.info("Success in fn bostonCrimesTable", result)
    //     res.status(200).send(result)
    // }).catch(error => {
    //     logger.error("Error in fn bostonCrimesTable", error)
    //     res.status(500).send(error)
    // })
}

async function districtWiseCrimesCommitedWomen(req, res) {
    district_wise_crimes_commited_women.find({}).then(result => {
        logger.info("Success in fn ", result.length)
        res.status(200).send(result)
    }).catch(error => {
        logger.error("Error in fn ", error)
        res.status(500).send(error)
    })
}


// itrative approach using cursor :
// let docs = []
// co(function*() {
//     const cursor = vancouver_crime_data.find({}).cursor();
//     for (let doc = yield cursor.next(); doc != null; doc = yield cursor.next()) {
//       docs.push(doc)
//     }
//   });

async function vancouverCrimeTable(req, res) {
    return client.get(`vancouver_crime_data`, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            vancouver_crime_data.find({}).exec(function (error, responseJSON) {
                if (error) {
                    logger.error("Error in fn vancouverCrimeTable",error)
                    res.status(500).send(error)
                } else {
                    client.setex(`vancouver_crime_data`, 180000, JSON.stringify(responseJSON));
                    logger.info("Success in fn vancouverCrimeTable")
                    res.status(200).send(responseJSON)
                }
            })
        }
    })
}



module.exports = {
    denverCrimeTable,
    bostonCrimesTable,
    districtWiseCrimesCommitedWomen,
    californiaLawEnforcementByAgency,
    californiaLawEnforcementByCampus,
    californiaLawEnforcementByCity,
    californiaLawEnforcementByCounty,
    vancouverCrimeTable
}