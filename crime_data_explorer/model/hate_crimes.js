var mongoose = require('mongoose');

var HateCrimeSchema = new mongoose.Schema({  
    INCIDENT_DATE:Number,
    DATE_YEAR:Number,
    ORI:String,
    PUB_AGENCY_NAME:String,
    PUB_AGENCY_UNIT:String,
    AGENCY_TYPE_NAME:String,
    STATE_ABBR:String,
    STATE_NAME:String,
    DIVISION_NAME:String,
    REGION_NAME:String,
    POPULATION_GROUP_CODE:String,
    POPULATION_GROUP_DESC:String,
    INCIDENT_DATE:String,
    ADULT_VICTIM_COUNT:Number,
    JUVENILE_VICTIM_COUNT:Number,
    TOTAL_OFFENDER_COUNT:Number,
    ADULT_OFFENDER_COUNT:Number,
    JUVENILE_OFFENDER_COUNT:Number,
    OFFENDER_RACE:String,
    OFFENDER_ETHNICITY:String,
    VICTIM_COUNT:Number,
    OFFENSE_NAME:String,
    TOTAL_INDIVIDUAL_VICTIMS:String,
    LOCATION_NAME:String,
    BIAS_DESC:String,
    VICTIM_TYPES:String,
    MULTIPLE_OFFENSE:String,
    MULTIPLE_BIAS:String,
});
mongoose.model('hate_crime', HateCrimeSchema);

module.exports = mongoose.model('hate_crime');