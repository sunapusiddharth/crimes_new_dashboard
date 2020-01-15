var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({  
    region_code:Number,
    state_abbr:String,
    state_fips_code:Number,
    state_id:Number,
    state_name:String
});
mongoose.model('state', StateSchema);

module.exports = mongoose.model('state');