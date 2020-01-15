var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
const people = require('../model/people')

//redis setup used for caching department data which egts data from external linsk ;
const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.log("Error " + err);
});


//Gives all departments 
router.post('/', async function (req, res) {
    //give all depts then seaprate object which will have dep and their details ....
    //in ui when search is done then depatment will come and the searched forms will be displayed under it .
    //get states, cities , agency , organization , we need to arrange the child dept under parent dept .
    //since we can have larger data which needs pagination so can't use reduce to group data 
    let countries = await people.distinct("country").exec()
    let total_records = await people.count().exec()
    let { page, sort ,per_page} = req.body
    var perPage = per_page?per_page:10
        , current_page = Math.max(0, page);
    people.find({}).limit(perPage).skip(perPage * current_page).sort(sort).exec(function (error, people) {
        if (error) {
            res.status(500).send(error)
        } else {
            console.log("count of records",people.length)
            res.send([
                { "countries": countries }, { "people": people }, { "total_records": total_records }
            ])
        }
    })
});

//to get single department:
router.get('/:id', function (req, res) {
    //redis implemenattion to give faster results : need to set TTL.
    //additional data req :
    people.findById(req.params.id).exec(function (error, person) {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        } else {
            res.status(200).send(person)
        }
    })
});



//to filter departments 
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


module.exports = router;