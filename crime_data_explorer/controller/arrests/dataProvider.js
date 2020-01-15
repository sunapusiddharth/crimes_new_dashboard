const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

//code to find unique no duplicates 
// aggregation_array = [
    //     {
    //         "$group": {
    //             "_id": '$id',
    //             "doc": { "$first": "$$ROOT" }
    //         }
    //     },
    //     { "$replaceRoot": { "newRoot": "$doc" } }
    // ]
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const arrests_national = require('../../model/arrests/arrests_national')
const arrests_national_adults = require('../../model/arrests/arrests_national_adults')
const arrests_national_juvenile = require('../../model/arrests/arrests_national_juvenile')
const arrests_national_drug = require('../../model/arrests/arrests_national_drug')

async function getNationalSummary(req, res) {
    //
    try {
        // res.status(200).send(docs)
        arrests_national.find({},{_id:0,id:0,__v:0}).then(data=>{
            logger.info("Success for function getNationalSummary- ",data)
            res.status(200).send(data)
        })
    } catch (error) {
        logger.info("Success for function getNationalSummary- ",data)
        res.status(500).send(error)
    }
}

async function getAdultsSummary(req, res) {
    //group on offense_name for frontend the y will be differen values and x will be year
    // To do: add redux it takes lot of time. 
    try {
        console.log("inide fn 1 ")
        let docs = []
        let aggregation_array = []
        aggregation_array = [
            {
                "$group": {
                    "_id": '$offense_name',
                    "docs":{$push:"$$ROOT"}  
                }
            },
        ]
        cursor = arrests_national_adults.aggregate(aggregation_array)
            .allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        await cursor.eachAsync(data => docs.push(data));
        // logger.info("Success for function getAdultsSummary- ",data)
        res.status(200).send(docs)
    } catch (error) {
        logger.error("Error for function getAdultsSummary- ",error)
        res.status(500).send(error)
    }
}


async function getJuvenileSummary(req, res) {
    //group on offense_name for frontend the y will be differen values and x will be year
    // To do: add redux it takes lot of time. 
    try {
        let docs = []
        let aggregation_array = []
        aggregation_array = [
            {
                "$group": {
                    "_id": '$offense_name',
                    "docs":{$push:"$$ROOT"}  
                }
            },
        ]
        cursor = arrests_national_juvenile.aggregate(aggregation_array)
            .allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        await cursor.eachAsync(data => docs.push(data));
        // logger.info("Success for function getAdultsSummary- ",data)
        res.status(200).send(docs)
    } catch (error) {
        logger.error("Error for function getJuvenileSummary- ",error)
        res.status(500).send(error)
    }
}

async function getDrugSummary(req, res) {
    //
    try {
        // res.status(200).send(docs)
        arrests_national_drug.find({},{_id:0,id:0,__v:0}).then(data=>{
            logger.info("Success for function getDrugSummary- ",data)
            res.status(200).send(data)
        })
    } catch (error) {
        logger.error("Success for function getDrugSummary- ",data)
        res.status(500).send(error)
    }
}
module.exports = {
    getNationalSummary,
    getAdultsSummary,
    getJuvenileSummary,
    getDrugSummary
}