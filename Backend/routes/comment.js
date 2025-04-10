const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { addComment, editComment } = require('../controllers/commentController.js');

const router = express.Router();

router.post('/:postId/comments', protect, addComment);
router.put('/comments/:commentId', protect, editComment);

module.exports = router;