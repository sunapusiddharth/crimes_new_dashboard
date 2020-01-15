var mongoose = require('mongoose');

var EstimatedCrimeSchema = new mongoose.Schema({  
    year:Number,
    state_id:Number,
    state_abbr:String,
    state_name:String,
    population:Number,
    violent_crime:Number,
    homicide:Number,
    rape_legacy:Number,
    rape_revised:Number,
    robbery:Number,
    aggravated_assault:Number,
    property_crime:Number,
    burglary:Number,
    larceny:Number,
    motor_vehicle_theft:Number,
    caveats:String
});
mongoose.model('estimated_crime', EstimatedCrimeSchema);

module.exports = mongoose.model('estimated_crime');