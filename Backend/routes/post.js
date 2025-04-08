const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController.js');
const  { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getAllPosts);

module.exports = router;