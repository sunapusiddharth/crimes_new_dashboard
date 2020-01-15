const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const offender_national_age = require('../../model/offender-tkm/age/national')
const offender_national_count = require('../../model/offender-tkm/count/national')
const offender_national_sex = require('../../model/offender-tkm/sex/national')
const offender_national_relationship = require('../../model/offender-tkm/relationship/national')
const offender_national_race = require('../../model/offender-tkm/race/national')
const offender_national_ethnicity = require('../../model/offender-tkm/ethnicity/national')

// const offender_national_age = require('../../model/offender-tkm/age/national')
// const offender_national_count = require('../../model/offender-tkm/count/national')
// const offender_national_sex = require('../../model/offender-tkm/sex/national')
// const offender_national_relationship = require('../../model/offender-tkm/relationship/national')
// const offender_national_race = require('../../model/offender-tkm/race/national')
// const offender_national_ethnicity = require('../../model/offender-tkm/ethnicity/national')


async function offenderData(type,variable,offense_code,req,res){
    let data_collection
    if(type == 'national'){
        switch (variable) {
            case "age":
                data_collection = offender_national_age
            break;
            case "ethnicity":
                data_collection = offender_national_ethnicity
            break;
            case "relationship":
                data_collection = offender_national_relationship
            break;
            case "count":
                data_collection = offender_national_count
            break;
            case "sex":
                data_collection = offender_national_sex
            break;
            case "race":
                data_collection = offender_national_race
            break;
            default:
                break;
        }
    }else{
    }

    //perform actual action 
    //Note - inner query on nested not working don't knwo why .Need to handle it in UI side .
    let start_year = parseInt(req.query.start_year)
    let end_year = parseInt(req.query.end_year)
    console.log(typeof start_year,end_year)
    data_collection.find({
        offense_code:offense_code,
        "data.key":"Male"
    }).then(data=>{
        logger.info(`success for offender variable- ${variable} offense_code- ${offense_code}`)
        res.status(200).send(data)
    }).catch(error=>{
        res.status(500).send(error)
    })
}

module.exports={
    offenderData
}