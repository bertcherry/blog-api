const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    display_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean }
});

module.exports = mongoose.model("User", UserSchema);