var mongoose = require('mongoose');

var BostonCrimeSchema = new mongoose.Schema({  
    INCIDENT_NUMBER:String,
    OFFENSE_CODE:Number,
    OFFENSE_CODE_GROUP:String,OFFENSE_DESCRIPTION:String,
    DISTRICT:Number,REPORTING_AREA:Number,SHOOTING:Boolean,OCCURRED_ON_DATE:String,YEAR:Number,MONTH:Number,DAY_OF_WEEK:String,HOUR:Number,
    UCR_PART:String,STREET:String,Lat:Number,Long:Number,Location:String
});
mongoose.model('boston_crime_data', BostonCrimeSchema);

module.exports = mongoose.model('boston_crime_data');