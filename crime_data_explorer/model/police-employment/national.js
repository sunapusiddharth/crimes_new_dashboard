var mongoose = require('mongoose');

var PoliceEmplymentNationalSchema = new mongoose.Schema({  
    data_year:Number,
    civilian_ct:Number,
    female_civilian_ct:Number,
    female_officer_ct:Number,
    female_total_ct:Number,
    male_civilian_ct:Number,
    male_officer_ct:Number,
    male_total_ct:Number,
    population:Number,
    ori:String,
    ncic_agency_name:String,
    agency_name_edit:String,
    agency_type_name:String,
    state_abbr:String,
    csv_header:String,
    pe_ct_per_1000:Number,
    agency_count_pe_submitting:Number
});
mongoose.model('police_employment_national', PoliceEmplymentNationalSchema);

module.exports = mongoose.model('police_employment_national');