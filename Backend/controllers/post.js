const { default: slugify } = require("slugify");
const postModel  = require("../models/Post.js");
const { mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require('path')
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js')

const newPost = catchAsync (async (req, res, next) =>  {
  console.log(req.file);
  const tags = JSON.parse(req.body.tags);
  console.log(tags);

    if (!req.user.id) {
      return res.json({
        message: "required user id",
      });
    }

    const isExit = await postModel.findOne({
      title: req.body.title,
    });
    if (isExit) {
      return next(appError("Post already Exists!"));
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "VoxHive",
      });

    const createPost = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      tags,
      slug: slugify(req.body.title, {
        lower: true,
      }),
      image: result.secure_url,
      author: req.user.id,
    });

    res.json({
      message: "Post Uploaded successfully!",
      data: createPost,
    });
});

const getPost = catchAsync(async(req, res, next) => {
  console.log("Decoded User ID:", req.user.id);
  if(!req.user.id) {
    return next(appError("Required User Id to Find this Post!"))
  }
  const allPost = await postModel.find({
    author: req.user.id
  }).populate({
    path: "author",
    select: "userName",
    options: { limit: 2 }
  });
  res.json({
    message: "All Post from this USer!",
    data: allPost
  });
});

const getAllPostForGuestUser = catchAsync(async(req, res) => {
  const allPost = await postModel.find();
  if(allPost.length > 0) {
    return res.status(200).json({
      message: "All Posts",
      data: allPost,
      success: true
    });
  }
  next(appError("Posts Not Found!", 404))
});

const getAllPostForRegisterUser = catchAsync(async(req, res, next) => {
  const { searchQuery } = req.query
  const { id } = req.user;
  console.log(id);

  const pipeline = [
    {
      $match: {
        // author: new mongoose.Types.ObjectId(id),
        // $or: [{ title: { $regex: searchQuery, $options: "i" } }],
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "allTags",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
    {
      $lookup: {
        from: "bookmarks",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$post", "$$postId"] },
                  { $eq: ["$user", new mongoose.Types.ObjectId(id)] },
                ],
              },
            },
          },
        ],
        as: "bookmarkByUser",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$post", "$$postId"] },
                  { $eq: ["$user", new mongoose.Types.ObjectId(id)] },
                ],
              },
            },
          },
        ],
        as: "likeByUser",
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$post", "$$postId"] },
                  { $eq: ["$user", new mongoose.Types.ObjectId(id)] },
                ],
              },
            },
          },
        ],
        as: "CommentByUser",
      },
    },
    {
      $addFields: {
        isBookMark: { $gt: [{ $size: "$bookmarkByUser" }, 0] },
        isLike: { $gt: [{ $size: "$likeByUser" }, 0] },
      },
    },
  ];

  if (searchQuery) {
    pipeline.push({
      $match: {
        $or: [
          {
            title: { $regex: searchQuery, $options: "i" },
            description: { $regex: searchQuery, $options: "i" },
          },
        ],
      },
    });
  }

  const allPost = await postModel.aggregate(pipeline);
  res.status(200).json({
    message: "All Post",
    data: allPost,
  });
});

module.exports = { newPost, getPost, getAllPostForGuestUser, getAllPostForRegisterUser }