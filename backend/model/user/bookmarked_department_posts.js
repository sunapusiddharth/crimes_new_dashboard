var mongoose = require('mongoose');
var userDepartmentPosts = new mongoose.Schema({  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department_posts'
    }]
});
mongoose.model('user_department_posts', userDepartmentPosts);

module.exports = mongoose.model('user_department_posts');