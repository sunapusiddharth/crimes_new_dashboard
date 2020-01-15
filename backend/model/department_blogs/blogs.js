var mongoose = require('mongoose');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var Blogs = new mongoose.Schema({  
    title:String,
    body:String,
    created_date:Date,
    changed_date:Date,
    likes:Number,
    author:{ type: Schema.Types.ObjectId, ref: 'people' },
});
mongoose.model('blogs', Blogs);

module.exports = mongoose.model('blogs');