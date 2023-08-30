const express = require('express');

const {logOut} = require('../controllers/LogOut');

const Router = express.Router();

Router.post('/', logOut);

module.exports = Router;