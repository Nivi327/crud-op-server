const express = require('express');
const { postLogin, resetPassword } = require('../controllers/Login');

const Router = express.Router();

Router.post('/', postLogin);

Router.post('/reset-password', resetPassword);

module.exports = Router;