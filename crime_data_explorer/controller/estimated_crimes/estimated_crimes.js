var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
router.get('/populate_tables', function (req, res) {
    helper.populateTable(req,res)
});

router.get('/estimated_crimes', function (req, res) {
    dataProvider.getTotalCrimesTest(req,res)
});

router.get('/highmap', function (req, res) {
    dataProvider.highmapData(req,res)
});


module.exports = router;
