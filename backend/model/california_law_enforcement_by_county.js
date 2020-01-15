var mongoose = require('mongoose');

var CaliforniaLawEnforcementByCounty = new mongoose.Schema({  
    Metropolitan_Nonmetropolitan:Number,
    County:Number,
    Violent_crime:Number,
    Murder_and_nonnegligent_manslaughter:Number,
    rape_revised_definition:Number,
    rape_legacy_defnition:Number,
    robbery:Number,
    aggravated_assault:Number,
    property_crime:String,
    burglary:Number,
    larceny_theft:Number,
    motor_vehicle_theft:Number,
    arson:Number
});
mongoose.model('california_law_enforcement_by_county', CaliforniaLawEnforcementByCounty);

module.exports = mongoose.model('california_law_enforcement_by_county');