var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
const people = require('../model/people')

const victimsdataProvider = require('./people/victims')
const accusseddataProvider = require('./people/accussed')
const data_provider = require('./people/dataProvider')
//redis setup used for caching department data which egts data from external linsk ;
const redis = require('redis');

const client = redis.createClient(6379, 'redis')

client.on('error', (err) => {
    console.log("Error " + err);
});


//Gives all people 
router.post('/', async function (req, res) {
    data_provider.peoplePaginated(req,res)
});


//to get single people:
router.get('/:id', function (req, res) {
    //redis implemenattion to give faster results : need to set TTL.
    //additional data req :
    people.findById(req.params.id).exec(function (error, person) {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        } else {
            console.log("Success in personbyId",person)
            console.log("Success in params_id=",req.params.id)
            res.status(200).send(person)
        }
    })
});



//to filter people 
router.post('/filter', async function (req, res) {
    let { country } = req.body
    var perPage = 10
        , current_page = Math.max(0, page);
    people.find({
        $or: [
            { country: country }
        ]
    }).sort(sort_field).limit(perPage).skip(perPage * current_page).exec(function (error, person) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(person)
        }
    })
});

//Add a new person :
router.get('/add_person/:type',function (req,res){
    if(req.params.type == 'victim'){
        victimsdataProvider.addVictim(req,res)
    }else if(req.params.type == 'accussed'){
        accusseddataProvider.addAccussed(req,res)
    }
})

router.get('/recent/:type/:count',function (req,res){
    if(req.params.type == 'victim'){
        victimsdataProvider.getVictims(req,res,parseInt(req.params.count))
    }else if(req.params.type == 'accussed'){
        accusseddataProvider.getAccussed(req,res,parseInt(req.params.count))
    }
})





module.exports = router;