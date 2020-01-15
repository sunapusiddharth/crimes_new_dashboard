var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
var crime = require('../model/crimes');
var faker = require('faker');

router.use(bodyParser.urlencoded({
    extended: true
}));
//loading the modals:
var crime = require('../model/crimes');
var incidentPeople = require('../model/incidentPeople');
var incident = require('../model/incident');
var people = require('../model/people');


router.get('/:incidentNumber', async function (req, res) {
    try {
        let incidentNumber = req.params.incidentNumber
        let crime_data = await crime.find({ incident_number: incidentNumber }, { offense_description: 1, year: 1, month: 1, day_of_week: 1, hour: 1, street: 1 }).limit(1)
        let incident_data = await incident.find({ incident_number: incidentNumber }).limit(1)
        //for the time being add dummy lorem ipsum for summary 
        incident_data = {...incident_data,summary:faker.lorem.sentences(50)}
        let incidentPeople_data = await incidentPeople.find({ incident_number: incidentNumber }).limit(1)
        let aggregated_data = {
            incidentNumber,
            crime_data,
            incident_data,
            incidentPeople_data
        }
        console.log(aggregated_data)
        res.status(200).send(aggregated_data)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

//to load the data of people after rendering is complete:
router.post('/people', async function (req, res) {
    try{
        let {people_ids} = req.body
        console.log(req.body)
    if(!people_ids) return []
     let aggregated_data = await Promise.all(people_ids.map(person_id=>{
        return new Promise((resolve,reject)=>{
            people.findById(person_id).then(data=>resolve(data)).catch(error=>{
                console.log("error=",error)
                reject(error)
            })
        })
    }))
    // console.log("aggregated_data=",aggregated_data)
    res.status(200).send(aggregated_data)
    }catch(error){
        console.log("error=",error)
        res.status(200).send(aggregated_data)
    }
})

module.exports = router;
