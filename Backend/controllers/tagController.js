const { default: mongoose } = require('mongoose');
const Post = require('../models/Post.js');
const Tag = require('../models/tags.js');
const appError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

const getPostByTag = catchAsync(async (req, res, next) => {
    const { tagId } = req.query;

    if(!mongoose.Types.ObjectId.isValid(tagId)) {
        return next(appError('Invailid Tag ID!', 400));
    }

    const posts = await Post.aggregate([
        {
            $match: {
                tags: mongoose.Types.ObjectId(tagId),
            },
        },
        {
            $lookup: {
                from: 'tags',
                localFeild: 'tags',
                foreignField: '_id',
                as: 'tagDetails',
            },
        },
        {
            $unwind: 'tagDetails',
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                creatAt: 1,
                author: 1,
                tags: 1,
                tagDetails: {
                    _id: 1,
                    name: 1
                },
            },
        },
    ]);
    if (post.length === 0) {
        return next(appError('No post found with this tag!', 404)); 
    }

    res.status(200).json({
        status: 'success',
        data: { posts },
    });
});

module.exports = { getPostByTag };