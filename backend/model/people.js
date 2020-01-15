var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PeopleSchema = new mongoose.Schema({  
 name:[String],
 address:[String],
 phone:[String],
 email:[String],
 education:[{
     education_type:String,
     from:Date,
     to:Date,
     duration:Number,
     school_name:String,
     qualification_name:String,
     address:String,
     active:Boolean
 }],
 employment:[{
    employment_type:String,
     active:Boolean,
     from:Date,
     to:Date,
     duration:Number,
     address:String,
     company_name:String,
     title:String
 }],
 photos:[String],
 social_link:[String],
 prisons:[{
    name:String,
    from:Date,
    to:Date,
    duration:Number,
    cell_holding:String,
    supervisor:[{
        name:String,
        external_url:String,
        contact_authority:String
    }]
 }],
 departments:[{
     name:String,
     address:String,
     from:Date,
     to:Date,
     duration:Number,
     position:String,
 }],
 is_accussed:Boolean,
 is_law:Boolean,
 is_suspect:Boolean,
 country:String,
 is_witness:Boolean,
 cases:[{type:Schema.Types.ObjectId,ref:'crime'}],
 avatar:String
});
// mongoose.model('people', PeopleSchema);

module.exports = mongoose.model('people',PeopleSchema);