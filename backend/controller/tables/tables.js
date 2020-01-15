var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
router.get('/populate_tables_boston_crimes', function (req, res) {
    helper.populateTableBostonCrimes(req,res)
});

router.get('/populate_tables_denver_crimes', function (req, res) {
    helper.populateTableDenverCrimes(req,res)
});

router.get('/california_law_enforcement_by_agency', function (req, res) {
    helper.californiaLawEnforcementbyAgency(req,res)
});

router.get('/california_law_enforcement_by_campus', function (req, res) {
    helper.californiaLawEnforcementbyCampus(req,res)
});

router.get('/california_law_enforcement_by_city', function (req, res) {
    helper.californiaLawEnforcementbyCity(req,res)
});

router.get('/california_law_enforcement_by_county', function (req, res) {
    helper.californiaLawEnforcementbyCounty(req,res)
});

// Tables 
router.get('/california_law_enforcement_by_county_data', function (req, res) {
    dataProvider.californiaLawEnforcementByCounty(req,res)
});

router.get('/california_law_enforcement_by_campus_data', function (req, res) {
    dataProvider.californiaLawEnforcementByCampus(req,res)
});

router.get('/california_law_enforcement_by_city_data', function (req, res) {
    dataProvider.californiaLawEnforcementByCity(req,res)
});


router.get('/california_law_enforcement_by_agency_data', function (req, res) {
    dataProvider.californiaLawEnforcementByAgency(req,res)
});


router.post('/populate_tables_boston_crimes_data', function (req, res) {
    dataProvider.bostonCrimesTable(req,res)
});

router.post('/populate_tables_denver_crimes_data', function (req, res) {
    dataProvider.denverCrimeTable(req,res)
});

router.get('/populate_tables_dc_metro_crimes', function (req, res) {
    helper.populateTableDCMetroCrimes(req,res)
});

router.get('/populate_tables_vancouver_crimes', function (req, res) {
    helper.populateTableVancouverCrimes(req,res)
});

router.get('/populate_tables_baltimore_crimes', function (req, res) {
    helper.populateTableBaltimoreCrimes(req,res)
});


router.get('/vancouver_crimes', function (req, res) {
    dataProvider.vancouverCrimeTable(req,res)
});

module.exports = router;
