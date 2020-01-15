var mongoose = require('mongoose');

var VictimsSexNationalSchema = new mongoose.Schema({  
    male_count:Number,
    female_count:Number,
    unknown:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_sex_national', VictimsSexNationalSchema);

module.exports = mongoose.model('victims_sex_national');