const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true },
    status: { type: String, required: true, enum: ['Draft', 'Published'], default: 'Draft' },
    pub_date: { type: Date },
});

PostSchema.virtual('pub_date_formatted').get(function() {
    return DateTime.fromJSDate(this.pub_date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', PostSchema);