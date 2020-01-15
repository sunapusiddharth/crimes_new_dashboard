var mongoose = require('mongoose');

var ArrestsNationalDrugSchema = new mongoose.Schema({
    "id": Number,
    "year": Number,
    "state_abbr": Number,
    "agencies": Number,
    "population": Number,
    "total_arrests": Number,
    "total_manufacture": Number,
    "opioid_manufacture": Number,
    "marijuana_manufacture": Number,
    "synthetic_manufacture": Number,
    "other_manufacture": Number,
    "total_possess": Number,
    "opioid_possess": Number,
    "marijuana_possess": Number,
    "synthetic_possess": Number,
    "other_possess": Number,
});
mongoose.model('arrests_national_drug', ArrestsNationalDrugSchema);

module.exports = mongoose.model('arrests_national_drug');