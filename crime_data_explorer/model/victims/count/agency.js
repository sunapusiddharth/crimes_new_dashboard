var mongoose = require('mongoose');

var VictimsCountAgencySchema = new mongoose.Schema({  
    count:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_count_agency', VictimsCountAgencySchema);

module.exports = mongoose.model('victims_count_agency');