var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const dataProvider = require('./dataProvider')
const dataInsert = require('./dataInsert')
let multer  = require('multer');
const helper = require('./helper')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

router.post('/crimes', function (req, res) {
    dataProvider.crimesPaginated(req,res)
});

router.get('/latest_crimes', function (req, res) {
    dataProvider.recentCommitedCrimes(req,res)
});


router.post('/add', function (req, res) {
    dataInsert.addCrime(req,res)
});


// helper methods to populate crime table :
// for populating address table
router.get('/populate_address', function (req, res) {
  helper.populateAddress(req,res)
});

router.get('/fetch_address', function (req, res) {
  helper.fetchAddress(req,res)
});

module.exports = router;
