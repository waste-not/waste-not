const express = require('express');
const jsonParser = require('body-parser').json();

const signupValidation = require(__dirname + '/../lib/signup_validation');

var publicRouter = module.exports = exports = express.Router();

// Used for async code on client to validate user
publicRouter
  .post('/validate/user', jsonParser, signupValidation, (req, res) => {
    res.status(200).json({ msg: 'username is available' });
});
