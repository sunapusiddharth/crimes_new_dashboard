var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var CommentBuckets = new mongoose.Schema({
    discussion_id: { type: Schema.Types.ObjectId, ref: 'blogs' },
    bucket: Number,
    count: Number,
    comments: [{
        slug: String,
        posted: Date,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'people'
        },
        text: String
    }
    ]
});
mongoose.model('comment_buckets', CommentBuckets);

module.exports = mongoose.model('comment_buckets');