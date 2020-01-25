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
const people = require('../../model/people')

//clear the cache of people if a new person is added to the db.
async function peoplePaginated(req, res) {
    try {
        let pageNumber = Math.floor(parseInt(isNaN(req.body.skip)?0:req.body.skip)/parseInt(req.body.limit))
        console.log("pageNumber crimes paginated=",pageNumber)
        if(pageNumber ==0) pageNumber = 1;
        let {skip,limit} = req.body
        return client.get(`people_offset${pageNumber}`, async (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            } else {
                let docs = []
                let aggregation_array = []
                aggregation_array = [
                    {
                        $facet: {
                            paginatedResults: [{$sort:{"name":-1}},{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
                            totalCount: [
                                {
                                    $count: 'count'
                                }
                            ]
                        },
                    },
                    {
                        $project: {
                            "paginatedResults.email": 1,
                            "paginatedResults.phone": 1,
                            "paginatedResults.address": 1,
                            "paginatedResults.name": 1,
                            "paginatedResults.education": 1,
                            "paginatedResults.employment": 1,
                            "paginatedResults.phtos": 1,
                            "paginatedResults.social_link": 1,
                            "paginatedResults.prisons":1,
                            "paginatedResults.departments":1,
                            "paginatedResults.cases":1,
                            "paginatedResults.avatar":1,
                            "paginatedResults.is_witness":1,
                            "paginatedResults.country":1,
                            "paginatedResults.is_suspect":1,
                            "paginatedResults.is_law":1,
                            "paginatedResults.is_accussed":1,
                            "paginatedResults._id":1,
                            "totalCount":1
                        }
                    }
                ]
                cursor = people.aggregate(aggregation_array)
                    .allowDiskUse(true).cursor({
                        batchSize: 10
                    }).exec()
                await cursor.eachAsync(data => docs.push(data));
                logger.info("Success in fucntion peoplePaginated:", aggregation_array)
                client.setex(`people_offset${pageNumber}`, 180000, JSON.stringify(docs));
                res.status(200).send(docs)
            }
        })
    } catch (error) {
        logger.error("Error in fucntion peoplePaginated:", error)
        res.status(500).send(error)
    }

   
}

module.exports = {
    peoplePaginated
}