var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')



//endpoints used :
// /api/summarized/agencies/{ori}/offenses/{since}/{until} Agency level SRS Crime Data Endpoint 
// fetch('https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/AK0010100/offenses/2000/2001?api_key=84ClEmn8prz1cCkI5vhSJzmx8PrDDkaFTX9zSryz').then(res=>res.json()).then(data=>console.log(data))

// /api/summarized/agencies/{ori}/{offense}/{since}/{until} Agency level SRS Crime Data Endpoint by Offense

// CREATES A NEW USER


router.get('/populate_tables/summarized', function (req, res) {
    helper.populateSummarized(req,res)
});


module.exports = router;
