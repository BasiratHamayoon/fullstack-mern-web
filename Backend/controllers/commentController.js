const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js');

const addComment = catchAsync(async (req, res, next) => {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if(!post) {
        return next(appError('Post Not Found!', 404));
    }
    const comment = await Comment.create({
        content,
        post: post._id,
        user: req.user._id
    });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
});

const editComment = catchAsync(async (req, res, next) => {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if(!comment) {
        return next(appError('Comment Not Found!', 404));
    }

    if(comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(appError('You are not authorized to edit this comment!', 403));
    }
    comment.content = content;
    await comment.save();

    res.json(comment);
});

const deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);

    if(!comment) {
        return next(appError('Comment not Found!', 404));
    }

    if(comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(appError('You are not Authorized to delete this comment!', 403));
    }
    await comment.remove();

    // This can Remove comment refrence from the post
    const post = await Post.findById(comment.post);;
    post.comments.pull(comment._id);
    await post.save();
    res.status(204).send('Comment Deleted');    
});

const getComments = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).populate('comments');

    if(!post) {
        return next(appError('Post Not Found!', 404));
    }
    res.json(post.comments);
});


module.exports = { addComment, editComment, getComments };

