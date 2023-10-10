const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pub_date: { type: Date, default: Date.now },
});

CommentSchema.virtual('pub_date_formatted').get(function() {
    return DateTime.fromJSDate(this.pub_date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Comment', CommentSchema);