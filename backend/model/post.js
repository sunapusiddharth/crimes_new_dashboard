var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var PostSchema = new mongoose.Schema({
    attachments: [String],
    body: String,
    changed: String,
    component: [{
        uuid: String,
        name: String,
    }],
    created: String,
    date: String,
    image: [String],
    teaser: [String],
    topic: [String],
    title: String,
    url: String,
    uuid: String,
    vuuid: String,
    department: { type: Schema.Types.ObjectId, ref: 'department' }
});
mongoose.model('post', PostSchema);

module.exports = mongoose.model('post');