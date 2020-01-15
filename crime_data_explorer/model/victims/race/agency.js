var mongoose = require('mongoose');

var VictimsRaceAgencySchema = new mongoose.Schema({  
    asian:Number,
    native_hawaiian:Number,
    black:Number,
    american_indian:Number,
    unknown:Number,
    white:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_race_agency', VictimsRaceAgencySchema);

module.exports = mongoose.model('victims_race_agency');