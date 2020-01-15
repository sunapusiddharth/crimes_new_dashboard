var mongoose = require('mongoose');

var DepartmentVacancies = new mongoose.Schema({  
    about_office:String,
    application_process:String,
    body:String,
    location:Object,
    num_positions:String,
    position:String,
    practice_area:String,
    qualifications:String,
    relocation_expenses:String,
    salary:String,
    title:String,
    travel:String,
    url:String,
    changed:Date,
    created:Date,
    deadline:String,
    hiring_office:String,
    hiring_org:Object,
    language:String,
    job_id:String,
});
mongoose.model('department_vacancies', DepartmentVacancies)

module.exports = mongoose.model('department_vacancies')