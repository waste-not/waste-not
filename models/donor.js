const mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
  username: {type: String, required: true},
  organization: {type: String, required: true},
  address: {type: String, required: true},
  contactNumber: {type: String, required: true},
  email: {type: String, required: true}
});

module.exports = exports = mongoose.model('Donor', donorSchema);
