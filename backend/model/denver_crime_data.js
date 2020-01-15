var mongoose = require('mongoose');

var DenverCrimeSchema = new mongoose.Schema({  
    INCIDENT_ID:Number,
    OFFENSE_ID:Number,
    OFFENSE_CODE:Number,
    OFFENSE_CODE_EXTENSION:Number,
    OFFENSE_TYPE_ID:String,
    OFFENSE_CATEGORY_ID:String,
    FIRST_OCCURRENCE_DATE:String,
    LAST_OCCURRENCE_DATE:String,
    REPORTED_DATE:String,
    INCIDENT_ADDRESS:String,
    GEO_X:Number,
    GEO_Y:Number,
    GEO_LON:Number,
    GEO_LAT:Number,
    DISTRICT_ID:Number,
    PRECINCT_ID:Number,
    NEIGHBORHOOD_ID:String,
    IS_CRIME:Number,
    IS_TRAFFIC:Number
});
mongoose.model('denver_crime_data', DenverCrimeSchema);

module.exports = mongoose.model('denver_crime_data');