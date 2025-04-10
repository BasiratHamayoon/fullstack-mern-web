const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { addComment } = require('../controllers/commentController.js');

const router = express.Router();

router.post('/:postId/comments', protect, addComment);

module.exports = router;