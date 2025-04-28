const express = require('express');
const { createComment } = require('../controllers/comment.js');
const { verify } = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/create-comment/:postId', verify, createComment);

module.exports = router;