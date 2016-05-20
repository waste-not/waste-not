const expect = require('chai').expect;

process.env.MONGODB_URI = 'mongodb://localhost/waste_not_test';
process.env.APP_SECRET = 'secrettesting';
const testPort = process.env.PORT = 5000;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const server = require(__dirname + '/../../../server');
const User = require(__dirname + '/../../../models/user');
const jwtAuth = require(__dirname + '/../../../lib/jwt_auth');

describe('UNIT: LIB: JWT auth', () => {
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
        lat: 47.6182206,
        lng: -122.3540207
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

  it('should accept valid token and set user object', done => {
    var testReq = {
      headers: {
        token: jwt.sign({ id: this.testUser._id }, process.env.APP_SECRET)
      }
    };
    var testNext = () => {
      expect(testReq.user._id).to.eql(this.testUser._id);
      done();
    };

    jwtAuth(testReq, {}, testNext);
  });

  it('should reject an invalid token', done => {
    var testReq = {
      headers: {
        token: jwt.sign({ id: this.testUser._id }, 'wrongsecretkey')
      }
    };

    var testRes = {
      status(statusCode) {
        expect(statusCode).to.eql(401);
        return testRes;
      },
      json(resObj) {
        expect(resObj.msg).to.eql('invalid token');
        done();
      }
    };

    jwtAuth(testReq, testRes);
  });

  it('should check for user existence', done => {
    var testReq = {
      headers: {
        token: jwt.sign(
          { id: 'doesnotexist56c4101d700a' },
          process.env.APP_SECRET
        )
      }
    };

    var testRes = {
      status(statusCode) {
        expect(statusCode).to.eql(401);
        return testRes;
      },
      json(resObj) {
        expect(resObj.msg).to.eql('invalid token');
        done();
      }
    };

    jwtAuth(testReq, testRes);
  });

});
