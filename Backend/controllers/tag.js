const Tag = require('../models/tags.js');
const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js')

const createTag = catchAsync(async(req, res, next) => {
    const { name } = req.body;
    const isExist = await Tag.findOne({
        name
    });
    if(isExist) {
        return next(appError("This Tag is already Exists!", 409))
    }

    const formatSlug = slugify(name, { lower: true });

    const newTag = await Tag.insertOne({
        name,
        slug: formatSlug,
        createdBy: req.user.id
    });
    res.status(201).json({
        message: "Tag Created!",
        data: newTag
    });
});

const allTags = catchAsync(async(req, res, next) => {
    const tags = await Tag.find();
    res.status(200).json({
        message: "All Tags",
        data: tags
    });
})

module.exports = { createTag, allTags };