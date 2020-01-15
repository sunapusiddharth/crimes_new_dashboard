var mongoose = require('mongoose');

var RegionSchema = new mongoose.Schema({  
    region_code:Number,
    region_desc:String,
    region_name:String
});
mongoose.model('region', RegionSchema);

module.exports = mongoose.model('region');