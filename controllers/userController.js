const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');

exports.verify_token = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

exports.verify_admin = function (req, res, next) {
    if (!req.user.user.admin) return res.sendStatus(403);
    next();
}

exports.login_authenticate = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.sendStatus(403);
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch === true) {
        jwt.sign({user}, process.env.TOKEN_KEY, { expiresIn: '20m' }, (err, token) => {
            if (err) return res.sendStatus(401);
            if (user.admin) res.json({token}).redirect('/admin');
            res.json({token}).redirect('/');
        });
    }
});

exports.admin_index = asyncHandler(async (req, res, next) => {
    res.json({message: 'NOT IMPLEMENTED: admin dashboard'});        
});