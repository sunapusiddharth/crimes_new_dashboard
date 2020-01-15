var express = require('express');
var router = express.Router();
// var VerifyToken = require(__root + 'auth/VerifyToken');
const helper = require('./helper')
const dataProvider = require('./dataProvider')

// CREATES A NEW USER
router.get('/populate_news_articles1', function (req, res) {
    helper.populateTableNewsArticles1(req,res)
});

router.get('/populate_news_articles2', function (req, res) {
    helper.populateTableNewsArticles2(req,res)
});

router.get('/populate_news_articles3', function (req, res) {
    helper.populateTableNewsArticles3(req,res)
});

router.get('/news_articles', function (req, res) {
    helper.populateTableNewsArticles3(req,res)
});


module.exports = router;
