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


module.exports = { addComment };