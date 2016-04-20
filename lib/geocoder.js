const request = require('superagent');

module.exports = exports = function(addressStr) {
  return new Promise((resolve, reject) => {
    request
      .get('http://geocode.arcgis.com/arcgis/rest/services/World/' +
        `GeocodeServer/find?text=${encodeURI(addressStr)}&f=json`)
      .end((err, res) => {
        if (err) return reject(err);
        var locations = JSON.parse(res.text).locations;
        if (!locations.length) return reject('unable to geocode');

        resolve({
          lat: locations[0].feature.geometry.y.toFixed(4),
          lng: locations[0].feature.geometry.x.toFixed(4)
        });
      });
  });
};
