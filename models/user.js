const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  organization: {type: String, required: true},
  address: {type: String, required: true},
  email: {type: String, required: true},
  contactNum: {type: String, required: true}
});

module.exports = exports = mongoose.model('User', userSchema);
