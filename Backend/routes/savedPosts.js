const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { savePost, getSavedPosts } = require('../controllers/savedPostsController.js');

const router = express.Router();

router.post('/post/:postId/save', protect, savePost);
router.get('/users/saved-posts', protect, getSavedPosts)


module.exports = router;