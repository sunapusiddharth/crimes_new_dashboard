var mongoose = require('mongoose');

var OffenseTkmStateSchema = new mongoose.Schema({  
    ui_type:String,
    ui_restriction:String,
    title:String,
    short_title:String,
    category:Number,
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
    offense_code:String,
    state_abbr:String
});
mongoose.model('offense_tkm_state_schema', OffenseTkmStateSchema);

module.exports = mongoose.model('offense_tkm_state_schema');