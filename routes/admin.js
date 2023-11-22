const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');

router.use(user_controller.verify_token, user_controller.verify_admin);

router.get('/', user_controller.admin_index);

router.get('/posts', post_controller.admin_all_posts);

router.get('/posts/:postId', post_controller.admin_post_detail);

module.exports = router;