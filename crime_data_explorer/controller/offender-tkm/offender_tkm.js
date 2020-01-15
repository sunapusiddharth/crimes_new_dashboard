var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')


router.get('/populate_tables/national', function (req, res) {
    helper.populateOffenderTkmNational(req,res)
});

router.get('/populate_tables/state', function (req, res) {
    helper.populateOffenderTkmState(req,res)
});

router.get('/offender_data/:type/:offense_code/:variable', function (req, res) {
    let {type,offense_code,variable} = req.params
    dataProvider.offenderData(type,variable,offense_code,req,res)
});


module.exports = router;
