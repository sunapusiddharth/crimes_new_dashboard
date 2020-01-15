var mongoose = require('mongoose');

var VictimsAgeAgencySchema = new mongoose.Schema({  
    unknown:Number,
    range_0_9:Number,
    range_10_19:Number,
    range_20_29:Number,
    range_30_39:Number,
    range_40_49:Number,
    range_50_59:Number,
    range_60_69:Number,
    range_70_79:Number,
    range_80_89:Number,
    range_90_99:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_age_agency', VictimsAgeAgencySchema);

module.exports = mongoose.model('victims_age_agency');