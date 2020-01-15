var mongoose = require('mongoose');

var VictimsEthnicityNationalSchema = new mongoose.Schema({  
    hispanic:Number,
    multiple:Number,
    not_hispanic:Number,
    unknown:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_ethnicity_national', VictimsEthnicityNationalSchema);

module.exports = mongoose.model('victims_ethnicity_national');