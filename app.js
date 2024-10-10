const express = require('express');
const mongoose = require('mongoose');
const webtoonRoutes = require('./routes/webtoons');
const authRoutes = require('./routes/auth');
const { authMiddleware } = require('./middleware/auth');
require('dotenv').config();


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/webtoons', webtoonRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
