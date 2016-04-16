const mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
  username: String,
  organization: String,
  address: String,
  contactNumber: Number,
  email: String
});

module.exports = exports = mongoose.model('Donor', donorSchema);
