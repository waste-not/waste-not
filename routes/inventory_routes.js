const express = require('express');
const jsonParser = require('body-parser').json();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

const Inventory = require(__dirname + '/../models/inventory');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var inventoryRouter = module.exports = exports = express.Router();

inventoryRouter.get('/inventory', (req, res) => {
  Inventory.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

inventoryRouter.post('/inventory', jwtAuth, jsonParser, (req, res) => {
  var newInventory = new Inventory(req.body);
  newInventory.createdBy = req.user._id;

  newInventory.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

inventoryRouter.put('/inventory/:id', jwtAuth, jsonParser, (req, res) => {
  var inventoryData = req.body;
  delete inventoryData._id;

  Inventory.update({ _id: req.params.id }, inventoryData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully updated inventory'});
  });
});

inventoryRouter.put('/inventory/claim/:id', jwtAuth, jsonParser, (req, res) => {
  Inventory.update(
    { _id: req.params.id, claimedBy: {$eq: ''} },
    { $set: { claimedBy: req.user._id } },
    (err, data) => {
      if (err) return handleDBError(err, res);
      if (!data.n) return res.status(410).json({msg: 'Inventory already claimed'});
      res.status(200).json({msg: 'Successfully claimed inventory'});
    }
  );
});

inventoryRouter.delete('/inventory/:id', (req, res) => {
  Inventory.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully deleted inventory', id: req.params.id});
  });
});
