var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
router.get('/populate_tables/agencies', function (req, res) {
    helper.populateAgencies(req,res)
});

router.get('/populate_tables/regions', function (req, res) {
    helper.populateRegions(req,res)
});

router.get('/populate_tables/states', function (req, res) {
    helper.populateStates(req,res,0)
});

router.get('/states', function (req, res) {
    dataProvider.getStates(req,res)
});


module.exports = router;
