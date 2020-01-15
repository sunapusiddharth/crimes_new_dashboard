var mongoose = require('mongoose');
// each department will have forms which will url for form stored in s3. each dept is categorised based on what it's role is .
var FeedbackSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    comment: String
});
mongoose.model('feedback', FeedbackSchema);

module.exports = mongoose.model('feedback');