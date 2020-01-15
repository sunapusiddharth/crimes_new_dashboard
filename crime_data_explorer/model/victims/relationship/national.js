var mongoose = require('mongoose');

var VictimsRelationshipNationalSchema = new mongoose.Schema({  
    acquaintance:Number,
    babysittee:Number,
    boyfriend_girlfriend:Number,
    child_boyfriend_girlfriend:Number,
    child:Number,
    common_law_spouse:Number,
    employee:Number,
    employer:Number,
    friend:Number,
    grandchild:Number,
    grandparent:Number,
    homosexual_relationship:Number,
    in_law:Number,
    neighbor:Number,
    other_family_member:Number,
    otherwise_known:Number,
    parent:Number,
    relationship_unknown:Number,
    sibling:Number,
    stepchild:Number,
    spouse:Number,
    stepparent:Number,
    stepsibling:Number,
    stranger:Number,
    offender:Number,
    ex_spouse:Number,
    data_year:Number,
    offense_code:String
});
mongoose.model('victims_relationship_national', VictimsRelationshipNationalSchema);

module.exports = mongoose.model('victims_relationship_national');