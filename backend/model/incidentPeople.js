var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var IncidentPeopleSchema = new mongoose.Schema({
    incident_number: String,
    victims: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'people'
    }],
    accussed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'people'
    }],
    suspects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'people'
    }],
    law: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'people'
    }],
    judge: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'people'
    }],
});
mongoose.model('incident_people', IncidentPeopleSchema);

module.exports = mongoose.model('incident_people');