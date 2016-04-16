const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  address1: {type: String, required: true},
  address2: {type: String, required: false},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  contactNumber: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, enum: ['donor', 'user'], required: true}
});

module.exports = exports = mongoose.model('User', userSchema);
