const express = require('express');
const { createPost, getAllPosts, getPostByID, getPostByAuthor, updatePost, deletePost } = require('../controllers/postController.js');
const  { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getAllPosts);
router.get('/:id', protect, getPostByID);
router.get('/author/:userId', protect, getPostByAuthor);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;