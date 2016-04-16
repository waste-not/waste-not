const express = require('express');
const jsonParser = require('body-parser').json();
const Donor = require(__dirname + '/../models/donor');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const handleUnavailError = require(__dirname + '/../lib/handle_unavailable');

var donorRouter = module.exports = exports = express.Router();

donorRouter.get('/donors', (req, res) => {
  Donor.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

donorRouter.post('/donors', (req, res) => {
  var newDonor = new Donor(req.body);
  newDonor.save((err, data) => {
    if (err) return handleUnavailError(err, res);
    res.status(200).json({msg: 'Successly created donor'});
  });
});

donorRouter.put('/donors/:id', jsonParser, (req, res) => {
  var donorData = req.body;
  delete donorData._id;
  Donor.update({_id: req.params.id}, donorData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successly updated donor'});
  });
});

donorRouter.delete('/donors/:id', (req, res) => {
  Donor.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successly deleted donor'});
  });
});
