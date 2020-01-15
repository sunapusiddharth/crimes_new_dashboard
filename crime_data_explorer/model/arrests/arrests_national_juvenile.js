var mongoose = require('mongoose');

var ArrestsNationalJuvenileSchema = new mongoose.Schema({
    "id": String,
    "state_abbr": String,
    "year": Number,
    "offense_code": String,
    "offense_name": String,
    "agencies": Number,
    "population": Number,
    "total_male": Number,
    "total_female": Number,
    "m_0_9": Number,
    "m_10_12": Number,
    "m_13_14": Number,
    "m_15": Number,
    "m_16": Number,
    "m_17": Number,
    "f_0_9": Number,
    "f_10_12": Number,
    "f_13_14": Number,
    "f_15": Number,
    "f_16": Number,
    "f_17": Number,
    "race_agencies": Number,
    "race_population": Number,
    "white": Number,
    "black": Number,
    "asian_pacific_islander": Number,
    "american_indian": Number
});
mongoose.model('arrests_national_juvenile', ArrestsNationalJuvenileSchema);

module.exports = mongoose.model('arrests_national_juvenile');