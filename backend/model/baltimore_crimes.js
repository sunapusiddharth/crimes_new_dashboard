var mongoose = require('mongoose');


var BaltimoreCrimeSchema = new mongoose.Schema({  
    CrimeDate:String,
    CrimeTime:String,
    CrimeCode:String,
    Location:String,
    Description:String,
    InsideOutside:String,
    Weapon:String,
    Post:Number,
    District:String,
    Neighborhood:String,
    Longitude:Number,
    Latitude:Number,
    Location:String,
    Premise:String,
    TotalIncidents:Number
});
mongoose.model('baltimore_metro_crime', BaltimoreCrimeSchema);

module.exports = mongoose.model('baltimore_metro_crime');