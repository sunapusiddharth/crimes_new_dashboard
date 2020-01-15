const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const victims_age_national = require('../../model/victims/age/national')
const victims_sex_national = require('../../model/victims/sex/national')
const victims_relationship_national = require('../../model/victims/relationship/national')
const victims_count_national = require('../../model/victims/count/national')
const victims_race_national = require('../../model/victims/race/national')
const victims_ethnicity_national = require('../../model/victims/ethnicity/national')




async function victimsAge(type, offense_code, req, res) {
    let data_collection
    if (type == 'national') {
        data_collection = victims_age_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    data_collection.find({
        offense_code: offense_code,
        "data_year": {
            $gte: start_year,
            $lte: end_year
        }
    },
    { _id:0,__v:0,offense_code:0}
        ).then(data => {
        logger.info(`success for victims ${type} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function victimsSex(type, offense_code, req, res) {
    let data_collection
    if (type == 'national') {
        data_collection = victims_sex_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    data_collection.find({
        offense_code: offense_code,
        "data_year": {
            $gte: start_year,
            $lte: end_year
        }
    },{ _id:0,__v:0,offense_code:0}
    ).then(data => {
        logger.info(`success for victims ${type} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function victimsRace(type, offense_code, req, res) {
    let data_collection
    if (type == 'national') {
        data_collection = victims_race_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    data_collection.find({
        offense_code: offense_code,
        "data_year": {
            $gte: start_year,
            $lte: end_year
        }
    },{ _id:0,__v:0,offense_code:0}).then(data => {
        logger.info(`success for victims ${type} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function victimsCount(type, offense_code, req, res) {
    let data_collection
    if (type == 'national') {
        data_collection = victims_count_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    data_collection.find({
        offense_code: offense_code,
        "data_year": {
            $gte: start_year,
            $lte: end_year
        }
    },{ _id:0,__v:0,offense_code:0,offense_code:0}).then(data => {
        logger.info(`success for victims ${type} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function victimsEthnicity(type, offense_code, req, res) {
    let data_collection
    if (type == 'national') {
        data_collection = victims_ethnicity_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    data_collection.find({
        offense_code: offense_code,
        "data_year": {
            $gte: start_year,
            $lte: end_year
        }
    },{ _id:0,__v:0,offense_code:0}).then(data => {
        logger.info(`success for victims ${type} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function victimsRelationship(type, offense_code, req, res) {
    let docs = []
    let data_collection
    if (type == 'national') {
        data_collection = victims_relationship_national
    } else {
    }
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    let aggregation_array = [
        { "$match": { "data_year": { $gte: start_year, $lte: end_year } } },
        {
            $group: {
                _id: null,
                acquaintance: { $sum: '$acquaintance' },
                babysittee: { $sum: '$babysittee' },
                boyfriend_girlfriend: { $sum: '$boyfriend_girlfriend' },
                child: { $sum: '$child' },
                child_boyfriend_girlfriend: { $sum: '$child_boyfriend_girlfriend' },
                common_law_spouse: { $sum: '$common_law_spouse' },
                employee: { $sum: '$employee' },
                employer: { $sum: '$employer' },
                ex_spouse: { $sum: '$ex_spouse' },
                friend: { $sum: '$friend' },
                grandchild: { $sum: '$grandchild' },
                grandparent: { $sum: '$grandparent' },
                homosexual_relationship: { $sum: '$homosexual_relationship' },
                in_law: { $sum: '$in_law' },
                neighbor: { $sum: '$neighbor' },
                offender: { $sum: '$offender' },
                other_family_member: { $sum: '$other_family_member' },
                otherwise_known: { $sum: '$otherwise_known' },
                parent: { $sum: '$parent' },
                relationship_unknown: { $sum: '$relationship_unknown' },
                sibling: { $sum: '$sibling' },
                spouse: { $sum: '$spouse' },
                stepchild: { $sum: '$stepchild' },
                stepparent: { $sum: '$stepparent' },
                stepsibling: { $sum: '$stepsibling' },
                stranger: { $sum: '$stranger' },
            }
        }
    ]
    cursor = data_collection.aggregate(aggregation_array)
        .allowDiskUse(true).cursor({
            batchSize: 10
        }).exec()
    await cursor.eachAsync(data => docs.push(data));
    res.status(200).send(docs)
    // data_collection.find({
    //     offense_code:offense_code,
    //     "data_year":{
    //         $gte:start_year,
    //         $lte:end_year
    //     }
    // }).then(data=>{
    //     logger.info(`success for victims ${type} offense_code- ${offense_code}`)
    //     res.status(200).send(data)
    // }).catch(error=>{
    //     res.status(500).send(error)
    // })
}

// to get the total and distinct values necessary:

async function getVictimsCount(req,res){
    // return new Promise((resolve,reject)=>{
        try {
            let docs=[]
            let aggregation_array = [
                { "$match": { "data_year": 2017 } },
                {
                    $group: {
                        _id: "$offense_code",
                        "count": { "$first": "$count" }
                    }
                }
            ]
            cursor = victims_count_national.aggregate(aggregation_array)
                .allowDiskUse(true).cursor({
                    batchSize: 10
                }).exec()
            await cursor.eachAsync(data => docs.push(data));
            res.status(200).send(docs)   
        } catch (error) {
            res.status(500).send(error)   
        }
    // })
}

function victimsCountDashboard(){
     return new Promise(async (resolve,reject)=>{
        try {
            let docs=[]
            let aggregation_array = [
                { "$match": { "data_year": 2017 } },
                {
                    $group: {
                        _id: "$offense_code",
                        "count": { "$first": "$count" }
                    }
                }
            ]
            cursor = victims_count_national.aggregate(aggregation_array)
                .allowDiskUse(true).cursor({
                    batchSize: 10
                }).exec()
            await cursor.eachAsync(data => docs.push(data));
            resolve(docs) 
        } catch (error) {
            console.log("error")
            reject(error)
        }
    })
}

module.exports = {
    victimsAge,
    victimsCount,
    victimsEthnicity,
    victimsRace,
    victimsRelationship,
    victimsSex,
    getVictimsCount,
    victimsCountDashboard
}