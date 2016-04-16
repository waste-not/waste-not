const mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
  title: String,
  createDate: Date,
  deadlineDate: Date,
  description: String,
  perishable: Boolean,
  address: String,
  category: {type: String, enum: ['Food', 'Clothing', 'Women', 'Children', 'Other']},
  note: String,
  claimed: {type: Boolean, default: false}
});

module.exports = exports = mongoose.model('Inventory', inventorySchema);
