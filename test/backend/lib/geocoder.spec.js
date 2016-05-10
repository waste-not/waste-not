const sinon = require('sinon');
const expect = require('chai').expect;
const superagent = require('superagent');
const geocoder = require(__dirname + '/../../../lib/geocoder');

describe('UNIT: LIB: Geocoder', () => {
  it('should make a geocode request', () => {
    var testAddress = '2901 3rd Avenue, Seattle WA 98121';

    var superagentMock = sinon.mock(superagent);
    superagentMock.expects('get')
      .withExactArgs('http://geocode.arcgis.com/arcgis/rest/services/World/'
        + `GeocodeServer/find?text=${encodeURI(testAddress)}&f=json`);

    geocoder(testAddress);
    expect(superagentMock.verify()).to.eql(true);
    superagentMock.restore();
  });

  it('should return a promise', () => {
    expect(geocoder('2901 3rd Avenue, Seattle WA 98121')).to.be.a('promise');
  });

  it('should convert a text address into coordinates', done => {
    geocoder('2901 3rd Avenue, Seattle WA 98121')
      .then(data => {
        expect(data.lat).to.be.a('number').within(-90, 90);
        expect(data.lng).to.be.a('number').within(-180, 180);
        done();
      });
  });

  it('should reject promise if geocode lookup fails', done => {
    geocoder('nowherejibberishaddress')
      .catch(msg => {
        expect(msg).to.not.be.an('error');
        expect(msg).to.eql('unable to geocode');
        done();
      });
  });
});
