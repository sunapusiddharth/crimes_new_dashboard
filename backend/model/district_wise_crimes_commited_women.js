



var mongoose = require('mongoose');

var districtWiseCrimesCommitedWomen = new mongoose.Schema({  
    State:Number,
    sl_no:Number,
    district:Number,
    year:Number,
    rape:String,
    attempt_to_commit_rape:Number,
    kidnapping_and_abduction_total:String,
    dowry_deaths:String,
    assualt_on_women_with_intent_to_outrage_her_modesty_total:String,
    insult_to_the_modesty_of_women_total:String,
    Cruelty_by_Husband_or_his_Relatives:Number,
    Importation_of_Girls_from_Foreign_Country:Number,
    Abetment_of_Suicides_of_Women:Number,
    Dowry_Prohibition_Act_1961:Number,
    Indecent_Representation_of_Women_Act_1986:Number,
    Protection_of_Children_from_Sexual_Offences_Act:Number,
    NEIGHBORHOOD_ID:String,
    Protection_of_Women_from_Domestic_Violence_Act_2005:Number,
    Immoral_Traffic_Prevention_Act:Number,
    Total_Crimes_against_Women:Number
});
mongoose.model('district_wise_crimes_commited_women', districtWiseCrimesCommitedWomen);

module.exports = mongoose.model('district_wise_crimes_commited_women');