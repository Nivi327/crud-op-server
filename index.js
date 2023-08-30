const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const SignupRouter = require('./Routes/Signup');
const LoginRouter = require('./Routes/Login');
const postRouter = require('./Routes/Posts');
const LogoutRouter = require('./Routes/LogOut');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/images', express.static(path.join(__dirname, 'images')));

app.use('/api/signup', SignupRouter);
app.use('/api/login', LoginRouter);

app.use('/api/posts', authMiddleware, postRouter);
app.use('/api/logout', authMiddleware, LogoutRouter);


app.listen(PORT, () => {
    console.log(`APP is listening on http://localhost:${PORT}`);
});