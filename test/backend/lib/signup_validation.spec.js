const expect = require('chai').expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/waste_not_test';
process.env.APP_SECRET = 'secrettesting';
const testPort = process.env.PORT = 5000;

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const server = require(__dirname + '/../../../server');
const User = require(__dirname + '/../../../models/user');
const signupValidation = require(__dirname + '/../../../lib/signup_validation');

describe('UNIT: LIB: Signup validation', () => {
  before(() => {
    server.listen(testPort);
  });

  before(done => {
    var formData = {
      username: 'testusername',
      password: bcrypt.hashSync('testpassword', 8),
      name: 'John Doe',
      address1: '2901 3rd Avenue',
      city: 'Seattle',
      state: 'Washington',
      zip: '98121',
      coordinates: {
        lat: 47.6158,
        lng: -122.3434
      },
      contactNumber: '5555555555',
      email: 'test@tester.com',
      role: 'user'
    };
    User.create(formData, (err, data) => {
      if (err) console.log(err);
      expect(err).to.eql(null);
      this.testUser = data;
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(done);
    });
  });

  it('should reject a request if username is taken', done => {
    var testReq = {
      body: { username: 'testusername' }
    };
    var testRes = {
      status(statusCode) {
        expect(statusCode).to.eql(400);
        return testRes;
      },
      json(resObj) {
        expect(resObj.msg).to.eql('username taken');
        done();
      }
    };
    signupValidation(testReq, testRes);
  });

  it('should move on if username is unique', done => {
    var testReq = {
      body: { username: 'unicornsandrainbows' }
    };
    signupValidation(testReq, {}, done);
  });
});
