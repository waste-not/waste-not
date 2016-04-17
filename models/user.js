const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
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

// userSchema.methods.hashPassword = function(password) {
//   return bcrypt.hashSync(password, 8);
// };

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET);
};

module.exports = exports = mongoose.model('User', userSchema);
