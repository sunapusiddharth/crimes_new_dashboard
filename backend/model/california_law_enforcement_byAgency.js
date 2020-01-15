var mongoose = require('mongoose');

var CaliforniaLawEnforcementByAgency = new mongoose.Schema({  
    statetTribal_other:String,
    agency:String,
    unit_office:String,
    total_law_enforcement:Number,
    total_officers:Number,
    total_civilians:Number
});
mongoose.model('california_law_enforcement_by_agency', CaliforniaLawEnforcementByAgency);

module.exports = mongoose.model('california_law_enforcement_by_agency');