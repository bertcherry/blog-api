const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

router.get('/', post_controller.public_index);

router.get('/posts', post_controller.public_all_posts);

router.get('/posts/:postId', post_controller.public_post_detail);

module.exports = router;