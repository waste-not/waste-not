const express = require('express');
const jsonParser = require('body-parser').json();
const Inventory = require(__dirname + '/../models/inventory');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const handleUnavailError = require(__dirname + '/../lib/handle_unavailable');

var inventoryRouter = module.exports = exports = express.Router();

inventoryRouter.get('/inventory', (req, res) => {
  Inventory.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

inventoryRouter.post('/inventory', jsonParser, (req, res) => {
  var newInventory = new Inventory(req.body);
  newInventory.save((err, data) => {
    if (err) return handleUnavailError(err, res);
    res.status(200).json({msg: 'Successfully created inventory'});
  });
});

inventoryRouter.put('/inventory/:id', jsonParser, (req, res) => {
  var inventoryData = req.body;
  delete inventoryData._id;
  Inventory.update({_id: req.params.id}, inventoryData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully updated inventory'});
  });
});

inventoryRouter.put('/inventory/:id/:claimedByID', jsonParser, (req, res) => {
  Inventory.update({_id: req.params.id}, {$set: {claimedBy: req.params.claimedByID}}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully claimed inventory'});
  });
});

inventoryRouter.delete('/inventory/:id', (req, res) => {
  Inventory.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully deleted inventory'});
  });
});
