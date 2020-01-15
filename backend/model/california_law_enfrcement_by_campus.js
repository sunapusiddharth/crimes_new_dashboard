var mongoose = require('mongoose');

var CaliforniaLawEnforcementByCampus = new mongoose.Schema({  
    University_College:String,
    Campus:String,
    Student_enrollment:String,
    Total_law_enforcement_employees:Number,
    total_officers:Number,
    total_civilians:Number
});
mongoose.model('california_law_enforcement_by_campus', CaliforniaLawEnforcementByCampus);

module.exports = mongoose.model('california_law_enforcement_by_campus');