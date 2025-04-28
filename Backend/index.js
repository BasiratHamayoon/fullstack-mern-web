const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db.js');
const multer = require('multer');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

//Routes
const userRoute = require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const tagRoute = require('./routes/tag.js');
const bookMarkRoutes = require('./routes/bookmark.js');
const LikeRoutes = require('./routes/like.js');
const commentRoutes = require('./routes/comment.js');


connectDB();

const app = express();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoute);
app.use('/api/bookMark', bookMarkRoutes);
app.use('/api/likes', LikeRoutes);
app.use('/api/comment', commentRoutes);



const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running!`));