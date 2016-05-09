const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

process.env.MONGOLAB_URI = 'mongodb://localhost/waste_not_test';
process.env.APP_SECRET = 'secrettesting';
const testPort = process.env.PORT = 5000;

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const server = require(__dirname + '/../../../server');
const User = require(__dirname + '/../../../models/user');

describe('Auth router endpoints', () => {
  before(() => {
    server.listen(testPort);
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(done);
    });
  });

  describe('/signup', () => {
    it('should be able to create a new user', done => {
      var formData = {
        username: 'newusername',
        password: 'newpassword',
        name: 'John Doe',
        address1: '2901 3rd Avenue',
        city: 'Seattle',
        state: 'Washington',
        zip: '98121',
        contactNumber: '5555555555',
        email: 'test@tester.com',
        role: 'user'
      };

      request('localhost:5000')
        .post('/api/signup')
        .send(formData)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          // expect(res.body).to.have.all.keys(['token', '_id']);
          done();
        });
    });
  });

  describe('/signin', () => {
    beforeEach(done => {
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
          long: -122.3434
        },
        contactNumber: '5555555555',
        email: 'test@tester.com',
        role: 'user'
      };
      User.create(formData, err => {
        if (err) console.log(err);
        expect(err).to.eql(null);
        done();
      });
    });

    it('should be able to sign in', done => {
      request('localhost:5000')
        .get('/api/signin')
        .auth('testusername', 'testpassword')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should be refuse access with incorrect password', done => {
      request('localhost:5000')
        .get('/api/signin')
        .auth('testusername', 'wrongpassword')
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('invalid username or password');
          done();
        });
    });

    it('should be refuse access with incorrect username', done => {
      request('localhost:5000')
        .get('/api/signin')
        .auth('wrongusername', 'testpassword')
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('invalid username or password');
          done();
        });
    });
  });
});
