var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var NewsArticlesSchema = new mongoose.Schema({
id:Number,
title:String,
publication:String,
author:String,
date:Date,
year:Number,
month:Number,
url:String,
content:String,
image:[String],
thumb_url:String,
medium_url:String
});
mongoose.model('news_articles', NewsArticlesSchema);

module.exports = mongoose.model('news_articles');