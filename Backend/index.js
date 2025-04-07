const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.js');
const connectDB = require('./config/db');

//Routes
const authRoutes = require('./routes/auth.js');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);  
app.use('/api/users', userRoutes);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running!`));
