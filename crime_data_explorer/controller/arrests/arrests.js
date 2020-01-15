// Arrestee Demograhic Data for All Crimes Offenses get from arrests_national_juvenile 
//we have two screens for above one for juvenile and one for adult
//final - take form here : /api/data/arrest/national/{offense}/{variable}/{since}/{until} National level Arrest Demographic Count By Offense Endpoint
var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')
// const dataProvider = require('./dataProvider')

router.get('/populate_tables/arrests_national_adults', function (req, res) {
    helper.populateArrestsNationalAdult(req,res)
});

router.get('/populate_tables/arrests_national_drug', function (req, res) {
    helper.populateArrestsNationalDrug(req,res)
});

router.get('/populate_tables/arrests_national_juvenile', function (req, res) {
    helper.populateArrestsNationalJuvenile(req,res)
});

router.get('/populate_tables/arrests_national', function (req, res) {
    helper.populateArrestsNational(req,res)
});

router.get('/national_summary', function (req, res) {
    dataProvider.getNationalSummary(req,res)
});

router.get('/adults_summary', function (req, res) {
    dataProvider.getAdultsSummary(req,res)
});

router.get('/juvenile_summary', function (req, res) {
    dataProvider.getJuvenileSummary(req,res)
});

router.get('/drug_summary', function (req, res) {
    dataProvider.getDrugSummary(req,res)
});


module.exports = router;
