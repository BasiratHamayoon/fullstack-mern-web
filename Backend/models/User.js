const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user'
    },
    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('users', userSchema);