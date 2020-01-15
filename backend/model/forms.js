var mongoose = require('mongoose');
// each department will have forms which will url for form stored in s3. each dept is categorised based on what it's role is .
var FormsSchema = new mongoose.Schema({  
    domain_name: String,
    domain_type: String,
    agency: String,
    organization: String,
    city: String,
    state: String,
    securuity_contact_email: String,
    agency_url: String,
    description:String,
    _id:String,
    logo:{
        thumb_url:String,
        small_url:String,
        medium_url:String
    },
    name:String,
    parent_id:Number,
    recent_articles_url:String,
    short_name:String,
    slug:String,
    url:String,
    forms:{
        type:Array
    }
});
mongoose.model('forms', FormsSchema);

module.exports = mongoose.model('forms');