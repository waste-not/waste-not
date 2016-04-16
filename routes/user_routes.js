const express = require('express');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const handleUnavailError = require(__dirname + '/../lib/handle_unavailable');

var userRouter = module.exports = exports = express.Router();

userRouter.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

userRouter.post('/users', jsonParser, (req, res) => {
  var newUser = new User(req.body);
  newUser.save((err, data) => {
    if (err) return handleUnavailError(err, res);
    res.status(200).json({msg: 'Successly created user'});
  });
});

userRouter.put('/users/:id', jsonParser, (req, res) => {
  var userData = req.body;
  delete userData._id;
  User.update({_id: req.params.id}, userData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successly updated user'});
  });
});

userRouter.delete('/users/:id', (req, res) => {
  User.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successly deleted user'});
  });
});
