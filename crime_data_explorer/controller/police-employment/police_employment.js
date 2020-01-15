var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')


router.get('/populate_tables/agency', function (req, res) {
    helper.populatePoliceEmploymentAgency(req,res)
})

router.get('/populate_tables/national', function (req, res) {
    helper.populatePoliceEmploymentNational(req,res)
})

router.get('/populate_tables/state', function (req, res) {
    helper.populatePoliceEmploymentStates(req,res)
})

router.get('/pe_per_1000', function (req, res) {
    dataProvider.policeOfficersToPopulation(req,res)
})

router.get('/pe_breakout', function (req, res) {
    dataProvider.peBreakout(req,res)
})

module.exports = router;
