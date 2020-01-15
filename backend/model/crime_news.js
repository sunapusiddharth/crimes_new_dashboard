var mongoose = require('mongoose');

var CrimeNewsSchema = new mongoose.Schema({  
 source_name:String,
 author:String,
 title:String,
 description:String,
 url:String,
 urlToImage:String,
 publishedAt:Date,
 content:String,
 hits:Number,
 tags:String,
 full_content:String
});
mongoose.model('crime_news', CrimeNewsSchema);

module.exports = mongoose.model('crime_news');