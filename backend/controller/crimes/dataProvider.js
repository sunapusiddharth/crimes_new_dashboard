const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const redis = require('redis');
const client = redis.createClient(6379, 'redis')

client.on('error', (err) => {
    console.log("Error " + err);
});

const logger = new winston.createLogger(myWinstonOptions)
const crimes = require('../../model/crimes')

async function userSpecificCrimes(req, res) {
    //TO DO : to get ids from request and then return those records.
}

async function recentCommitedCrimes(req, res) {
    //TO DO : to get ids from request and then return those records.
    try {
        return client.get(`latest_crimes`, async (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            } else {

                crimes.find({}).sort({ occurence_on_date: -1 }).limit(10).then(results => {
                    logger.info("Success in fn ", results.length)
                    client.setex(`latest_crimes`, 7200, JSON.stringify(results));
                    res.status(200).send(results)
                }).catch(error => {
                    logger.error("error in fn ", error)
                    res.status(500).send(error)
                })
            }
        })
    } catch (error) {
        logger.error("Error in fucntion recentCommitedCrimes:", error)
        res.status(500).send(error)
    }
}

async function crimesPaginated(req, res) {

    // NOTE: TO GET SINGLE CRIME THERE IS ALREADY AN ENDPOINT /:crime_id
    try {
        
        let pageNumber = Math.floor(parseInt(isNaN(req.body.skip)?0:req.body.skip)/parseInt(req.body.limit))
        console.log("pageNumber crimes paginated=",pageNumber)
        if(pageNumber ==0) pageNumber = 1;
        return client.get(`crimes_${pageNumber}`, async (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            } else {
                let { skip, limit } = req.body
                let docs = []
                let aggregation_array = []
                aggregation_array = [
                    {
                        $facet: {
                            // always skipping +10 since first 10 are to be shown separately in recent crimes .
                            paginatedResults: [{ $sort: { "occurence_on_date": -1 } }, { $skip: parseInt(skip) + 10 }, { $limit: parseInt(limit) }],
                            totalCount: [
                                {
                                    $count: 'count'
                                }
                            ]
                        },
                    },
                    {
                        $project: {
                            "paginatedResults.incident_number": 1,
                            "paginatedResults.address": 1,
                            "paginatedResults.title": 1,
                            "paginatedResults.description": 1,
                            "paginatedResults.category": 1,
                            "paginatedResults.imageUrl": 1,
                            "paginatedResults.occurence_on_date": 1,
                            "paginatedResults._id": 1,
                            totalCount: 1
                        }
                    }
                ]
                cursor = crimes.aggregate(aggregation_array)
                    .allowDiskUse(true).cursor({
                        batchSize: 10
                    }).exec()
                await cursor.eachAsync(data => docs.push(data));
                logger.info("Success in fucntion crimesPaginated:", aggregation_array)
                client.setex(`crimes_${pageNumber}`, 180000, JSON.stringify(docs));
                res.status(200).send(docs)
            }
        })
    } catch (error) {
        logger.error("Error in fucntion crimesPaginated:", error)
        res.status(500).send(error)
    }
}

module.exports = {
    userSpecificCrimes,
    crimesPaginated,
    recentCommitedCrimes
}