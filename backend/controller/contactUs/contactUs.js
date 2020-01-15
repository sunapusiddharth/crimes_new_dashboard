var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const feedback = require('../../model/feedback')

//Saves contact feedback
router.post('/save_contact_feedback', function (req, res) {
    let data = req.body
    feedback.create(data).then(response=>res.status(200).send(response)).catch(error=>res.status(500).send(error))
});

module.exports = router;
