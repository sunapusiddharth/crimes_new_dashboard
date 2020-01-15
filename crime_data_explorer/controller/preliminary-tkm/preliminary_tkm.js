var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')


router.get('/populate_tables/national', function (req, res) {
    helper.populatePreliminaryTkmNational(req,res)
});



module.exports = router;
