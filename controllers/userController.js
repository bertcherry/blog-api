const User = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.admin_index = asyncHandler(async (req, res, next) => {
    //need to set up JWT session
    return res.send('NOT IMPLEMENTED: Admin dashboard');
});