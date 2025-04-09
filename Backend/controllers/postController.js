const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js');

const createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
});

const getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find().populate('author', 'name');
    res.json(posts);
});

const getPostByID = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return next(appError('Post not Found!', 404));
    res.json(post);
});

const getPostByAuthor = catchAsync(async (req, res, next) => {
    const posts = await Post.find({author: req.params.userId });
    res.json(posts);
})


module.exports = { createPost, getAllPosts, getPostByID, getPostByAuthor };