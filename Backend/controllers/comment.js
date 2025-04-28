const Comment = require("../models/comment.js");
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js');

const createComment = catchAsync(async(req, res, next) => {
    const { id } = req.user
    const { postId } = req.params
    const { content } = req.body
    const newComment = await Comment.insertOne({
        user: id,
        post: postId,
        content,
    });
    res.status(200).json({
        message: "You add a Comment",
        data: newComment
    });
});

module.exports ={ createComment };