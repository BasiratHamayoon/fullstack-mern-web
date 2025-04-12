const express = require('express');
const { getPostByTag } = require('../controllers/tagController.js');
const { protect, authorize } = require('../middlewares/authMiddleware.js');

const routes = express.Router();