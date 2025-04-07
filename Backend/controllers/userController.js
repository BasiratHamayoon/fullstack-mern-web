const User = require('../models/User.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/AppError.js');

const getProfile = catchAsync(async (req, res, next) => {
    res.json(req.user);
});

const updateProfile = catchAsync(async (req, res, next) => {
    const { name, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, bio }, { new: true});
    res.json(updatedUser);
});

const deleteAccount = catchAsync(async (req, res, next ) => {
    await  User.findByIdAndDelete(req.user._id);
    res.status(200).json({
        status: 'success',
        message: 'Your account has been deleted successfully.'
    });
});

module.exports = { getProfile, updateProfile, deleteAccount };
