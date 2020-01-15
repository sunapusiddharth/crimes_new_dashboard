var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var BlogComment = new mongoose.Schema({
    discussion_id: { type: Schema.Types.ObjectId, ref: 'blogs' },
    parent_id:String,
    posted: Date,
    slug:String,
    full_slug:String,
    likes: Number,
    author: {
        id:String,
        name:String
    },
    text: String,
});
mongoose.model('blog_comment', BlogComment);

module.exports = mongoose.model('blog_comment');

// BlogComment.pre('save', function (next) {
//     let comment = this;
//     let timestamp = moment(comment.posted).format('YYYY.MM.DD.hh:mm:ss');
//     let slug_part = generateSlug();
//     let full_slug_part = timestamp + ':' + slug_part;
  
//     if ( comment.parent_id ) {
//       BlogComment.findOne({'_id': comment.parent_id }, { slug: 1, full_slug: 1 })
//         .then(parent => {
//           comment.slug = parent.slug + '/' + slug_part;
//           comment.full_slug = parent.full_slug + '/' + full_slug_part;
//           next();
//         });
//     } else {
//       comment.slug = slug_part;
//       comment.full_slug = timestamp + ':' + slug_part;
//       next();
//     }
//   });