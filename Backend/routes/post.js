const express = require('express');
const { createPost } = require('../controllers/postController.js');
const  { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', protect, createPost);

module.exports = router;