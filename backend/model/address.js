var mongoose = require('mongoose');
var AddressSchema = new mongoose.Schema({  
    address:String,
    city:String,
    state:String,
    postalCode:Number,
    loc:{},
    country:String
});
mongoose.model('address', AddressSchema);

module.exports = mongoose.model('address');