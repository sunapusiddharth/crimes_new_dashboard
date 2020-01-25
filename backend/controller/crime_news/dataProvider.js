const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}

const moment = require('moment')

const redis = require('redis');

const client = redis.createClient(6379, 'redis')

client.on('error', (err) => {
    console.log("Error " + err);
});


const logger = new winston.createLogger(myWinstonOptions)
const crime_news = require('../../model/crime_news')

async function crimeNews(req, res) {
    // What data to be pulled ? 
    // trending : sort by hits date less than month more than 7 days, 
    // top headlines: sort by hits date less than 7 days 
    // category wise grouping and return top 10 of them to show in card columns with category
    // video news : random data from frontend
    // all news sorted by date .
    // most popular - of all time less than year sorted by hits
    // 
    try {
        return client.get(`crime_news`, async (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            } else {
                let docs = []
                let aggregation_array = []
                let last_month_date = new Date(moment().subtract(1, 'months').format('YYYY-MM-DD'))
                let last_week_date = new Date(moment().subtract(7, 'days').format('YYYY-MM-DD'))
                let last_year_date = new Date(moment().subtract(1, 'years').format('YYYY-MM-DD'))
                let last_two_days = new Date(moment().subtract(1, 'years').format('YYYY-MM-DD'))
                aggregation_array = [{
                    $facet: {
                        "trending last month": [
                            {
                                "$match": {
                                    "publishedAt": { $gte: last_month_date, $lte: last_week_date }
                                }
                            },
                            { $project: { hits: 1, publishedAt: 1,title:1,urlToImage:1,content:1 } },
                            { $sort: { hits: -1 } },
                            { $limit: 10 }
                        ],
                        "top headlines": [
                            { $match: { "publishedAt": { $gte: last_week_date } } },
                            { $project: { hits: 1, publishedAt: 1,title:1,urlToImage:1,content:1 } },
                            { $sort: { hits: -1 } },
                            { $limit: 10 }
                        ],
                        "most popular of all time": [
                            { $match: { "publishedAt": { $gte: last_year_date } } },
                            { $project: { hits: 1, publishedAt: 1 ,title:1,urlToImage:1,content:1} },
                            { $sort: { hits: -1 } },
                            { $limit: 10 }
                        ],
                        "categorised data": [
                            { $sort: { "hits": -1 } },
                            {
                                $group: {
                                    _id: "$tags",
                                    count: { $sum: 1 },
                                    data: {
                                        $push: {
                                            $cond: [
                                                { $gt: ["$publishedAt", last_two_days] },
                                                { title: "$title", hits: "$hits",_id:"$_id" },
                                                "$some_unknown_column"
                                            ]
                                        }
                                    }
                                }
                            },
                            { $project: { docs: { "$slice": ["$data", 10] } } }
                        ],
                        "categorizedByTags": [
                            { $unwind: "$tags" },
                            { $sortByCount: "$tags" }
                          ],
                    }
                }]
                cursor = crime_news.aggregate(aggregation_array)
                    .allowDiskUse(true).cursor({
                        batchSize: 10
                    }).exec()
                await cursor.eachAsync(data => docs.push(data));
                logger.info("Success in fucntion crimeNews:", aggregation_array)
                client.setex(`crime_news`, 180000, JSON.stringify(docs));
                res.status(200).send(docs)
            }
        })

    } catch (error) {
        logger.error("Error in fucntion crimeNews:", error)
        res.status(500).send(error)
    }
}

async function crimePaginatedNews(req, res) {
    try {
        let {skip,limit} = req.body
        let docs = []
        let aggregation_array = []
        aggregation_array = [
            {
                $facet: {
                    paginatedResults: [{$sort:{"publishedAt":-1}},{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
                    totalCount: [
                        {
                            $count: 'count'
                        }
                    ]
                },
            },
            {
                $project: {
                    "paginatedResults.author": 1,
                    "paginatedResults.title": 1,
                    "paginatedResults.description": 1,
                    "paginatedResults.urlToImage": 1,
                    "paginatedResults.pubishedAt": 1,
                    "paginatedResults.content": 1,
                    "paginatedResults.tags": 1,
                    "paginatedResults.hits": 1,
                    "paginatedResults.count":1,
                    "paginatedResults.publishedAt":1,
                    "paginatedResults._id":1,
                    "totalCount":1
                }
            }
        ]
        cursor = crime_news.aggregate(aggregation_array)
            .allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        await cursor.eachAsync(data => docs.push(data));
        logger.info("Success in fucntion crimePaginatedNews:", aggregation_array)
        res.status(200).send(docs)
    } catch (error) {
        logger.error("Error in fucntion crimePaginatedNews:", error)
        res.status(500).send(error)
    }

    // let {
    //     limit,
    //     offset,
    // } = req.body
    // offset = offset ? offset : 0
    // limit = limit ? limit : 10
    // crime_news.find({}, {
    //     author: 1,
    //     title: 1,
    //     description: 1,
    //     urlToImage: 1,
    //     pubishedAt: 1,
    //     content: 1,
    //     tags: 1,
    //     hits: 1
    // }).skip(offset).limit(limit).then(docs => {
    //     logger.info("Success in fn crimePaginatedNews: ", docs.length)
    //     res.status(200).send(docs)
    // }).catch(error => {
    //     logger.error("Error in fn crimePaginatedNews: ", error)
    //     res.status(500).send(error)
    // })
}


async function crime(req,res){
    crime_news.findById(req.params.id).exec(function (error, docs) {
        if (error) {
            logger.error("Error in function crime:",error)
            res.status(500).send(error)
        } else {
            logger.error("Success in function crime:",docs.length)
            res.status(200).send(docs)
        }
    })
}
module.exports = {
    crimeNews,
    crimePaginatedNews,
    crime
}