const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');

const basicHttpAuth = require(__dirname + '/../lib/basic_http_auth');
const signupValidation = require(__dirname + '/../lib/signup_validation');
const bcrypt = require('bcrypt');

const User = require(__dirname + '/../models/user');
var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, signupValidation, (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  var newUser = new User(req.body);
  newUser.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ token: data.generateToken() });
  });
});

authRouter.get('/signin', basicHttpAuth, (req, res) => {
  User.findOne({ username: req.basicHTTP.username }, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    if (!data || !data.comparePassword(req.basicHTTP.password))
      return res.status(401).json({ msg: 'invalid username or password' });

    res.json({ token: data.generateToken() });
  });
});
