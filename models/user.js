const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  organization: String,
  address: String,
  claims: [String]
});

module.exports = exports = mongoose.model('User', userSchema);
