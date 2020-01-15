var mongoose = require('mongoose');

var PreliminaryTkmNationalSchema = new mongoose.Schema({  
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
    variable:String
});
mongoose.model('preliminary_tkm_national_schema', PreliminaryTkmNationalSchema);

module.exports = mongoose.model('preliminary_tkm_national_schema');