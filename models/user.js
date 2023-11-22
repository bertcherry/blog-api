const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    display_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err);
});

UserSchema.method('comparePassword', function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

module.exports = mongoose.model("User", UserSchema);