const expect = require('chai').expect;
const dbErrorHandler = require(__dirname + '/../../../lib/handle_db_error');

describe('UNIT: LIB: DB error handler', () => {
  it('should set a status code and respond with error msg', () => {
    var called = 0;
    var testRes = {
      status(statusCode) {
        called++;
        expect(statusCode).to.eql(500);
        return testRes;
      },
      json(resObj) {
        called++;
        expect(resObj.msg).to.eql('database error');
      }
    };
    dbErrorHandler(null, testRes);
    expect(called).to.eql(2);
  });
});
