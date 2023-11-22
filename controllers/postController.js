const Post = require('../models/post');
const Comment = require('../models/comment');

const asyncHandler = require('express-async-handler');

exports.public_index = asyncHandler(async (req, res, next) => {
    const recentPosts = await Post.find({ status: 'Published' }).sort({ pub_date: -1 }).limit(6).exec();
    return res.json(recentPosts);
});

exports.public_all_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({ status: 'Published' }).sort({ pub_date: -1 }).exec();
    return res.json(allPosts);
});

exports.public_post_detail = asyncHandler(async (req, res, next) => {
    const [post, comments] = await Promise.all([
        Post.findById(req.params.postId).exec(),
        Comment.find({ post: req.params.postId }).populate('author').exec(),
    ]);
    return res.json({post, comments});
});

exports.admin_all_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ pub_date: -1 }).exec();
    return res.json(allPosts);
});

exports.admin_post_detail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    return res.json(post);
});