const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { addComment, editComment, getComments, deleteComment } = require('../controllers/commentController.js');

const router = express.Router();

router.post('/:postId/comments', protect, addComment);
router.put('/comments/:commentId', protect, editComment);
router.get('/:postId/comments', protect, getComments);
router.delete('/comments/:commentId', protect, deleteComment);

module.exports = router;