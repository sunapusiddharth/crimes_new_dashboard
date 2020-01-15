var mongoose = require('mongoose');

var IncidentSchema = new mongoose.Schema({  
 incident_number:String,
 photos:[{
     media_id:String,
     media_url:String,
     media_name:String
 }],
 videos:[{
    media_id:String,
    media_url:String,
    media_name:String
}],
 audios:[{
    media_id:String,
    media_url:String,
    media_name:String
}],
 files:[{
    media_id:String,
    media_url:String,
    media_name:String
}],
 external_link:[String]
});
mongoose.model('incident', IncidentSchema);

module.exports = mongoose.model('incident');