
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var DepartmentPosts = new mongoose.Schema({  
    attachments:[String],
    body:String,
    changed:Date,
    created:Date,
    image:String,
    teaser:String,
    title:String,
    url:String,
    author:{ type: Schema.Types.ObjectId, ref: 'people' },
});
mongoose.model('department_posts', DepartmentPosts)

module.exports = mongoose.model('department_posts')