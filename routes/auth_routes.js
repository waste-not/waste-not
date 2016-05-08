const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');

const bcrypt = require('bcrypt');
const basicHttpAuth = require(__dirname + '/../lib/basic_http_auth');
const signupValidation = require(__dirname + '/../lib/signup_validation');
const geocoder = require(__dirname + '/../lib/geocoder');

const User = require(__dirname + '/../models/user');
var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, signupValidation, (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  var newUser = new User(req.body);

  req.body.address2 = req.body.address2 || '';
  var addressStr = [
    req.body.address1,
    req.body.address2,
    req.body.city,
    req.body.state,
    req.body.zip
  ].join(' ');

  geocoder(addressStr)
    .then(coord => {
      newUser.coordinates = coord;
      newUser.save((err, data) => {
        if (err) return handleDBError(err, res);
        res.status(200).json({
          token: data.generateToken(),
          _id: data._id
        });
      });
    }, geocodeErr => {
      console.log(geocodeErr);
      res.status(500).json({ msg: 'Error in geocoding' });
    });
});

authRouter.get('/signin', basicHttpAuth, (req, res) => {
  User.findOne({ username: req.basicHTTP.username }, (err, data) => {
    if (err) return handleDBError(err, res);
    if (!data || !data.comparePassword(req.basicHTTP.password)) {
      return res.status(401).json({ msg: 'invalid username or password' });
    }

    res.status(200).json({
      token: data.generateToken(),
      role: data.role,
      username: data.username,
      _id: data._id
    });
  });
});
