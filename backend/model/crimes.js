var mongoose = require('mongoose');

//need to add random crime title and description for better view.
var CrimeSchema = new mongoose.Schema({  
 incident_number:String,
 address:String,
 title:String,
 description:String,
 category:String,
 imageUrl:String,
 offense_code:Number,
 offense_code_group:String,
 offense_description:String,
 district:String,
 reporting_area:Number,
 schooting:Boolean,
 occurence_on_date:Date,
 year:Number,
 month:Number,
 day_of_week:String,
 hour:Number,
 ucr_part:String,
 street:String,
 lat:Number,
 long:Number,
 location:String,
 city:String,
 state:String,
 loc:{},
 postalCode:Number
});
mongoose.model('crime', CrimeSchema);

module.exports = mongoose.model('crime');