const express = require('express');
const { createTag, allTags } = require('../controllers/tag.js');
const { verify } = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/create', verify, createTag);
router.get('/all-tags', allTags)

module.exports = router;