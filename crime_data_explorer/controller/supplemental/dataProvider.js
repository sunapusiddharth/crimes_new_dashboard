const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const supplemental_national = require('../../model/supplemental/national')
const supplemental_state = require('../../model/supplemental/state')

async function propertyStolen(type,req, res) {
    console.log("in")
    
    let data_collection
    if(type== 'national'){
        data_collection = supplemental_national
    }else if(type == 'state'){
        data_collection = supplemental_state
    }
    try {
        let data
        if (req.query.year) {
            data = await data_collection.find({ data_year: req.query.year }, {
                _id: 0,
                clothing_and_furs_stolen_value: 1,
                data_year: 1,
                firearms_stolen_value: 1,
                household_goods_stolen_value: 1,
                livestock_stolen_value: 1,
                not_specified_stolen_value: 1,
                office_equipment_stolen_value: 1,
                telvisions_radio_stereos_etc_stolen_value: 1,
            }).exec()
        } else if (req.query.year_range) {
            let year_range = parseInt(req.query.year_range)
            // let max_year = await supplemental_national.find({},{_id:0,data_year:1}).sort({data_year:-1}).limit(1).pretty()
            let max_year = 2010
            let last_year = 0
            // to do range filteration
            switch (year_range) {
                case 2:
                    last_year = (max_year - 2)+1
                    console.log("max_year=",max_year)
                    console.log("last_year=",last_year)
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_stolen_value: 1,
                        data_year: 1,
                        firearms_stolen_value: 1,
                        household_goods_stolen_value: 1,
                        livestock_stolen_value: 1,
                        not_specified_stolen_value: 1,
                        office_equipment_stolen_value: 1,
                        telvisions_radio_stereos_etc_stolen_value: 1,
                    }).exec()
                    break;
                case 5:
                    last_year = (max_year - 5)+1
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_stolen_value: 1,
                        data_year: 1,
                        firearms_stolen_value: 1,
                        household_goods_stolen_value: 1,
                        livestock_stolen_value: 1,
                        not_specified_stolen_value: 1,
                        office_equipment_stolen_value: 1,
                        telvisions_radio_stereos_etc_stolen_value: 1,
                    }).exec()
                    break;
                case 10:
                    last_year = (max_year - 10)+1
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_stolen_value: 1,
                        data_year: 1,
                        firearms_stolen_value: 1,
                        household_goods_stolen_value: 1,
                        livestock_stolen_value: 1,
                        not_specified_stolen_value: 1,
                        office_equipment_stolen_value: 1,
                        telvisions_radio_stereos_etc_stolen_value: 1,
                    }).exec()
                    break;
                default:
                    break;
            }
        } else {
            console.log("else condition")
            data = await data_collection.find({}, {
                _id: 0,
                clothing_and_furs_stolen_value: 1,
                data_year: 1,
                firearms_stolen_value: 1,
                household_goods_stolen_value: 1,
                livestock_stolen_value: 1,
                not_specified_stolen_value: 1,
                office_equipment_stolen_value: 1,
                telvisions_radio_stereos_etc_stolen_value: 1,
            }).exec()
        }
        logger.info(`Success proprtyStolen ${data}`)
        res.status(200).send(data)
    } catch (error) {
        logger.error(`Erorr proprtyStolen ${error}`)
        res.status(500).send(error)
    }
}

async function propertyRecovered(type,req, res) {
    let data_collection
    if(type== 'national'){
        data_collection = supplemental_national
    }else if(type == 'state'){
        data_collection = supplemental_state
    }
    try {
        let data
        if (req.query.year) {
            data = await data_collection.find({ data_year: req.query.year }, {
                _id: 0,
                clothing_and_furs_recovered_count: 1,
                currency_notes_etc_recovered_count: 1,
                data_year: 1,
                firearms_recovered_count: 1,
                household_goods_recovered_count: 1,
                jewelry_and_precious_metals_recovered_count: 1,
                livestock_recovered_count: 1,
                office_equipment_recovered_count: 1,
                telvisions_radio_stereos_etc_recovered_count: 1,
            }).exec()
        } else if (req.query.year_range) {
            let year_range = req.query.year_range
            // let max_year = await supplemental_national.find({},{_id:0,data_year:1}).sort({data_year:-1}).limit(1).pretty()
            let max_year = 2010
            let last_year = 0
            switch (year_range) {
                case "2":
                    last_year = (max_year - 2)+1
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_recovered_count: 1,
                        currency_notes_etc_recovered_count: 1,
                        data_year: 1,
                        firearms_recovered_count: 1,
                        household_goods_recovered_count: 1,
                        jewelry_and_precious_metals_recovered_count: 1,
                        livestock_recovered_count: 1,
                        office_equipment_recovered_count: 1,
                        telvisions_radio_stereos_etc_recovered_count: 1,
                    }).exec()
                    break;
                case "5":
                    last_year = (max_year - 5)+1
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_recovered_count: 1,
                        currency_notes_etc_recovered_count: 1,
                        data_year: 1,
                        firearms_recovered_count: 1,
                        household_goods_recovered_count: 1,
                        jewelry_and_precious_metals_recovered_count: 1,
                        livestock_recovered_count: 1,
                        office_equipment_recovered_count: 1,
                        telvisions_radio_stereos_etc_recovered_count: 1,
                    }).exec()
                    break;
                case "10":
                    last_year = (max_year - 10)+1
                    data = await data_collection.find({ data_year: { $gte: last_year } }, {
                        _id: 0,
                        clothing_and_furs_recovered_count: 1,
                        currency_notes_etc_recovered_count: 1,
                        data_year: 1,
                        firearms_recovered_count: 1,
                        household_goods_recovered_count: 1,
                        jewelry_and_precious_metals_recovered_count: 1,
                        livestock_recovered_count: 1,
                        office_equipment_recovered_count: 1,
                        telvisions_radio_stereos_etc_recovered_count: 1,
                    }).exec()
                    break;
                default:
                    break;
            }
        } else {
            data = await data_collection.find({}, {
                _id: 0,
                clothing_and_furs_recovered_count: 1,
                currency_notes_etc_recovered_count: 1,
                data_year: 1,
                firearms_recovered_count: 1,
                household_goods_recovered_count: 1,
                jewelry_and_precious_metals_recovered_count: 1,
                livestock_recovered_count: 1,
                office_equipment_recovered_count: 1,
                telvisions_radio_stereos_etc_recovered_count: 1,
            }).exec()
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}


async function removeDuplicates(req,res){
 
// This is the easiest query I used on my MongoDB 3.2
try {
   
    var bulk = supplemental_national.initializeOrderedBulkOp();
    var count = 0;
    console.log("inside")
   await  supplemental_national.aggregate([
      // Group on unique value storing _id values to array and count 
      { "$group": {
        "_id": "$data_year",
        "ids": { "$push": "$_id" },
        "count": { "$sum": 1 }      
      }},
      // Only return things that matched more than once. i.e a duplicate
      { "$match": { "count": { "$gt": 1 } } }
    ]).forEach(function(doc) {
        console.log("duplicates - ",doc.ids)
      var keep = doc.ids.shift();     // takes the first _id from the array
    
      bulk.find({ "_id": { "$in": doc.ids }}).remove(); // remove all remaining _id matches
      count++;
    
      if ( count % 500 == 0 ) {  // only actually write per 500 operations
          bulk.execute();
          bulk = supplemental_national.initializeOrderedBulkOp();  // re-init after execute
      }
    });
    
    // Clear any queued operations
    if ( count % 500 != 0 )
        bulk.execute();
    res.status(200).send("done")
} catch (error) {
    res.status(500).send(error)
}

}

module.exports = {
    propertyRecovered,
    propertyStolen,
    removeDuplicates
}