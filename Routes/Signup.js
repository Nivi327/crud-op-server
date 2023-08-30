const express = require('express');
const {signUp} = require('./../controllers/Signup');

const Router = express.Router();

Router.post('/', signUp);

module.exports = Router;