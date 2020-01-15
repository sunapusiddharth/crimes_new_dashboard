var mongoose = require('mongoose');

var SummarizedSchema = new mongoose.Schema({  
    actual:Number,
    cleared:Number,
    data_year:Number,
    offense:String,
    ori:String,
    state_abbr:String
});
mongoose.model('summarized', SummarizedSchema);

module.exports = mongoose.model('summarized');