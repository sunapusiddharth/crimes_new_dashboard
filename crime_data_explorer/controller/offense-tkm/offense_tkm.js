var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')



//endpoints used :
// /api/summarized/agencies/{ori}/offenses/{since}/{until} Agency level SRS Crime Data Endpoint 
// fetch('https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/AK0010100/offenses/2000/2001?api_key=84ClEmn8prz1cCkI5vhSJzmx8PrDDkaFTX9zSryz').then(res=>res.json()).then(data=>console.log(data))

// /api/summarized/agencies/{ori}/{offense}/{since}/{until} Agency level SRS Crime Data Endpoint by Offense

// CREATES A NEW USER


router.get('/populate_tables/national', function (req, res) {
    helper.populateOffenseTkmNational(req,res)
});

router.get('/populate_tables/state', function (req, res) {
    helper.populateOffenseTkmState(req,res)
});

//Query Routes :
router.get('/crime_rates_national', function (req, res) {
    dataProvider.crimeRatesNational(req,res)
});


module.exports = router;
