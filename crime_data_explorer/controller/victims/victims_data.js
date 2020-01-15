var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

router.get('/populate_tables/national', function (req, res) {
    helper.populateVictimsNational(req,res)
});

router.get('/populate_tables/agency', function (req, res) {
    helper.populateVictimsAgency(req,res)
});




router.get('/:type/:offense_code/:variable', function (req, res) {
    let {type,offense_code,variable} = req.params
    if(variable == 'sex'){
        dataProvider.victimsSex(type,offense_code,req,res)
    }else if(variable == 'age'){
        dataProvider.victimsAge(type,offense_code,req,res)
    }else if(variable == 'count'){
        dataProvider.victimsCount(type,offense_code,req,res)
    }else if(variable == 'race'){
        dataProvider.victimsRace(type,offense_code,req,res)
    }else if(variable == 'ethnicity'){
        dataProvider.victimsEthnicity(type,offense_code,req,res)
    }else{
        dataProvider.victimsRelationship(type,offense_code,req,res)
    }
});


router.get('/victims_count', function (req, res) {
    dataProvider.getVictimsCount(req,res)
});


module.exports = router;
