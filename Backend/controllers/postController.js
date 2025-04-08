const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js');

const createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
});

module.exports = { createPost };