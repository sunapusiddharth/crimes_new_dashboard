var mongoose = require('mongoose');

var OffenderTkmNationalRace = new mongoose.Schema({  
    ui_type:String,
    ui_restriction:String,
    title:String,
    short_title:String,
    category:String,
    data:[
        {
            data_year:Number,
            key:String,
            month_num:Number,
            value:Number,
        }
    ],
    keys:[String],
    noun:String,
    precise_data:[
        {
            data_year:Number,
            key:String,
            month_num:Number,
            value:Number
        }
    ],
    offense_code:String
});
mongoose.model('offender_tkm_national_race', OffenderTkmNationalRace);

module.exports = mongoose.model('offender_tkm_national_race');