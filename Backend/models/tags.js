const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

const tag = mongoose.model('Tag', tagSchema)