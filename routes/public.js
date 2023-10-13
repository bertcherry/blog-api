const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');

router.get('/', post_controller.public_index);

//create get route
router.post('/login', user_controller.login_authenticate);

router.get('/posts', post_controller.all_posts);

router.get('/posts/:postId', post_controller.public_post_detail);

module.exports = router;