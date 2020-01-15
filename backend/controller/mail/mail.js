var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
// router.get('/send_mail', function (req, res) {
//     dataProvider.sendMail(req,res)
// });

// CREATES A NEW USER
router.get('/send_mail_using_nodemailer', function (req, res) {
    dataProvider.sendMailUsingNodeMailer(req,res)
});



module.exports = router;
