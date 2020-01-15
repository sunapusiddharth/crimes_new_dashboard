var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
router.get('/populate_crime_news_test', function (req, res) {
    helper.populateTableCrimeNews(req,res)
});

router.get('/crimes_aggregated', function (req, res) {
    dataProvider.crimeNews(req,res)
});

router.post('/crimes', function (req, res) {
    dataProvider.crimePaginatedNews(req,res)
});

router.get('/crimes/:id', function (req, res) {
    dataProvider.crime(req,res)
});



module.exports = router;
