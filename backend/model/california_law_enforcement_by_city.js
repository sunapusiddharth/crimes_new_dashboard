var mongoose = require('mongoose');

var CaliforniaLawEnforcementByCity = new mongoose.Schema({  
    city:String,
    population:Number,
    Total_law_enforcement_employees:Number,
    total_officers:Number,
    total_civilians:Number
});
mongoose.model('california_law_enforcement_by_city', CaliforniaLawEnforcementByCity);

module.exports = mongoose.model('california_law_enforcement_by_city');