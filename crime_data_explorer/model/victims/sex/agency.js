var mongoose = require('mongoose');

var VictimsSexAgencySchema = new mongoose.Schema({  
    male_count:Number,
    female_count:Number,
    unknown:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_sex_agency', VictimsSexAgencySchema);

module.exports = mongoose.model('victims_sex_agency');