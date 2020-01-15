var mongoose = require('mongoose');

var ArrestsNationalSchema = new mongoose.Schema({
    "id": Number,
    "year": Number,
    "population": Number,
    "total_arrests": Number,
    "homicide": Number,
    "rape": Number,
    "robbery": Number,
    "aggravated_assault": Number,
    "burglary": Number,
    "larceny": Number,
    "motor_vehicle_theft": Number,
    "arson": Number,
    "violent_crime": Number,
    "property_crime": Number,
    "other_assault": Number,
    "forgery": Number,
    "fraud": Number,
    "embezzlement": Number,
    "stolen_property": Number,
    "vandalism": Number,
    "weapons": Number,
    "prostitution": Number,
    "other_sex_offenses": Number,
    "drug_abuse": Number,
    "gambling": Number,
    "against_family": Number,
    "dui": Number,
    "liquor_laws": Number,
    "drunkenness": Number,
    "disorderly_conduct": Number,
    "vagrancy": Number,
    "other": Number,
    "suspicion": Number,
    "curfew_loitering": Number

});
mongoose.model('arrests_national', ArrestsNationalSchema);

module.exports = mongoose.model('arrests_national');