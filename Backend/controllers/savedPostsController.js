const mongoose = require('mongoose');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const appError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

const savePost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.postId;

    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return next(appError('Invailid Post ID!', 400));
    }
    const post = await Post.findById(postId);
    if(!post) {
        return next(appError('Post not FOund!',404))
    }

    const user = await User.findById(userId);
    if(user.savedPosts.includes(postId)) {
        return next(appError('Post already saved!', 400));
    }
    user.savedPosts.push(postId);
    await user.save();

    res.status(200).json({message: 'Post saved successfully!'});
});
module.exports = { savePost };