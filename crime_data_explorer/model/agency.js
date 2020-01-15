var mongoose = require('mongoose');

var AgencySchema = new mongoose.Schema({  
    agency_name:String,
    agency_type_name:String,
    county_name:String,
    division_name:String,
    latitude:String,
    longitude:Number,
    nibrs:Boolean,
    nibrs_start_date:String,
    ori:String,
    region_desc:String,
    region_name:String,
    state_abbr:String,
    state_name:String
});
mongoose.model('agency', AgencySchema);

module.exports = mongoose.model('agency');