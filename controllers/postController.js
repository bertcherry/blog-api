const Post = require('../models/post');
const Comment = require('../models/comment');

const asyncHandler = require('express-async-handler');

exports.public_index = asyncHandler(async (req, res, next) => {
    const recentPosts = await Post.find().sort({ pub_date: -1 }).limit(6).exec();
    return res.json(recentPosts);
});

exports.all_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ pub_date: -1 }).exec();
    return res.json(allPosts);
});

exports.public_post_detail = asyncHandler(async (req, res, next) => {
    const [post, comments] = await Promise.all([
        Post.findById(req.params.id).exec(),
        Comment.find({ post: req.params.id }).populate('author').exec(),
    ]);
    return res.json({post, comments});
});

exports.admin_post_detail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    return res.json(post);
});