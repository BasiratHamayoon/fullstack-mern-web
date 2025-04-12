const mongoose = require('mongoose');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const appError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

const savePost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.postId;

    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return next(appError('Invalid Post ID!', 400));  
    }
    
    const post = await Post.findById(postId);
    if(!post) {
        return next(appError('Post not found!', 404)); 
    }

    const user = await User.findById(userId);
    if(user.savedPosts.includes(postId)) {
        return next(appError('Post already saved!', 400));
    }
    
    user.savedPosts.push(postId);
    await user.save();

    res.status(200).json({ message: 'Post saved successfully!' });
});

// Get saved posts
const getSavedPosts = catchAsync(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const result = await User.aggregate([
        { $match: { _id: userId } },
        {
            $lookup: {
                from: 'posts',
                localField: 'savedPosts',
                foreignField: '_id',
                as: 'savedPostDetails',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'savedPostDetails.author',
                foreignField: '_id',
                as: 'savedPostDetails.authorInfo',
            },
        },
        {
            $addFields: {
                'savedPostDetails.author': {
                    $arrayElemAt: ['$savedPostDetails.authorInfo', 0], 
                },
            },
        },
        {
            $unwind: '$savedPostDetails', 
        },
        {
            $group: {
                _id: '$_id',
                savedPosts: { $push: '$savedPostDetails' }, 
            },
        },
        {
            $project: {
                _id: 0,
                savedPosts: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    tags: 1,
                    createdAt: 1,
                    author: {
                        _id: 1,
                        name: 1,
                        email: 1,
                    },
                },
            },
        },
    ]);

    res.status(200).json({ savedPosts: result[0]?.savedPosts || [] });
});

module.exports = { savePost, getSavedPosts };
