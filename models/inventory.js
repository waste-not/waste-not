const mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
  title: {type: String, required: true},
  createDate: {type: Date, default: Date.now},
  createdBy: {type: String, required: true},
  deadlineDate: {type: Date, required: true},
  description: {type: String, required: true},
  perishable: {type: Boolean, required: true},
  address: {type: String, required: true},
  coordinates: {
    lat: { type: Number, min: -90, max: 90 },
    lng: { type: Number, min: -180, max: 180 }
  },
  category: {type: String, enum: ['Food', 'Clothing', 'Women', 'Children', 'Other'], required: true},
  note: String,
  claimedBy: {type: String, default: ''}
});

module.exports = exports = mongoose.model('Inventory', inventorySchema);
