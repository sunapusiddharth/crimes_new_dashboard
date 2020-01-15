var mongoose = require('mongoose');

var DepartmentSpeeches = new mongoose.Schema({  
    attachment:[String],
    body:String,
    changed:Date,
    created:Date,
    image:String,
    location:Object,
    teaser:String,
    title:String,
    url:String,
    component:String
});
mongoose.model('department_speeches', DepartmentSpeeches)

module.exports = mongoose.model('department_speeches')