var mongoose = require('mongoose');


var DCMetroCrimeSchema = new mongoose.Schema({  
    
    "SHIFT":String,
    "OFFENSE":String,
    "METHOD":String,
    "BLOCK":String,
    "DISTRICT":Number,
    "PSA":Number,
    "WARD":Number,
    "ANC":Number,
    "NEIGHBORHOOD_CLUSTER":String,
    "BLOCK_GROUP":Number,
    "CENSUS_TRACT":Number,
    "VOTING_PRECINCT":String,
    "CCN":Number,
    "XBLOCK":Number,
    "YBLOCK":Number,
    "date":String,
    "EW":String,
    "NS":String,
    "quad":String,
    "crimetype":String
});
mongoose.model('dc_metro_crime', DCMetroCrimeSchema);

module.exports = mongoose.model('dc_metro_crime');