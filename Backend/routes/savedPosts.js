const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { savePost } = require('../controllers/savedPostsController.js');

const router = express.Router();

router.post('/post/:postId/save', protect, savePost);

module.exports = router;