const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const national_offense = require('../../model/offense-tkm/national')

async function crimeRatesNational(req,res){
    //for frontend use multiple line for different crimes.
    //give me offense_code and against each year the count .
    //to get data : group by on fields - offense_code and state_abbr . also include stats - total count of the data 
    let docs = []
    let aggregation_array = [] 
    //add a filter to the time period :
    if(req.params.start_year || req.params.end_year){
        aggregation_array = [
            { "$unwind": "$data"},
            { "$group": {
                "_id": { 
                    "offense_code": "$offense_code",
                    "year": "$data.data_year"
                }, 
                "value": { "$sum": "$data.value" } 
            }},
            { "$group": {
                "_id": "$_id.offense_code",
                "values": { "$push": { 
                    "year": "$_id.year",
                    "value": "$value"
                }},
                totalAmount: { $sum: { $add: "$value" } },
            }}
        ]
    }else{
        aggregation_array = [
            { "$unwind": "$data"},
            { "$group": {
                "_id": { 
                    "offense_code": "$offense_code",
                    "year": "$data.data_year"
                }, 
                "value": { "$sum": "$data.value" }
            }},
            { "$group": {
                "_id": "$_id.offense_code",
                "values": { "$push": { 
                    "year": "$_id.year",
                    "value": "$value"
                }},
                totalAmount: { $sum: { $add: "$value" } },
            }}
            
        ]
    }
    cursor = national_offense.aggregate(aggregation_array)
   .allowDiskUse(true).cursor({
        batchSize: 10
    }).exec()
    await cursor.eachAsync(data => docs.push(data));
    res.status(200).send(docs)
}

module.exports={
    crimeRatesNational
}