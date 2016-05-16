const fs = require('fs');
const csv = require('csv-write-stream');
const Inventory = require(__dirname + '/../models/inventory');

module.exports = exports = function(destFile) {
  destFile = destFile || 'data/active_inventory.csv';
  var writer = csv();
  writer.pipe(fs.createWriteStream(destFile));

  return Inventory.find({ claimedBy: '' }, (err, data) => {
    if (err) return console.log(err);
    if (!data.length) return writer.end();
    data.forEach(item => {
      writer.write({
        _id: item._id,
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng
      });
    });
    writer.end();
  });
};
