var mongoose = require('mongoose');

var VictimsCountNationalSchema = new mongoose.Schema({  
    count:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_count_national', VictimsCountNationalSchema);

module.exports = mongoose.model('victims_count_national');