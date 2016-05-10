const expect = require('chai').expect;
const basicHTTP = require(__dirname + '/../../../lib/basic_http_auth');

describe('UNIT: LIB: Basic HTTP Auth', () => {
  it('should be able to catch invalid data', done => {
    var testReq = {
      headers: {
        authorization: 'basic invalidauth'
      }
    };
    var testRes = {
      status(statusCode) {
        expect(statusCode).to.eql(401);
        return testRes;
      },
      json(resObj) {
        expect(resObj.msg).to.eql('could not authenticate');
        done();
      }
    };
    basicHTTP(testReq, testRes);
  });

  it('should be able to decode base64 string', done => {
    var testReq = {
      headers: {
        authorization: 'Basic ' + new Buffer('hello:world').toString('base64')
      }
    };
    var testNext = () => {
      expect(testReq.basicHTTP.username).to.equal('hello');
      expect(testReq.basicHTTP.password).to.equal('world');
      done();
    };
    basicHTTP(testReq, {}, testNext);
  });
});
