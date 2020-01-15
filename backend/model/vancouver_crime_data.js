var mongoose = require('mongoose');

var VancouverCrimeSchema = new mongoose.Schema({ 
    TYPE:String,
    date:String,
    HUNDRED_BLOCK:String,
    NEIGHBOURHOOD:String,
    Latitude:Number,
    Longitude:Number 
});
mongoose.model('vancouver_metro_crime', VancouverCrimeSchema);

module.exports = mongoose.model('vancouver_metro_crime');