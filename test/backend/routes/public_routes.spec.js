const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

process.env.MONGODB_URI = 'mongodb://localhost/waste_not_test';
process.env.APP_SECRET = 'secrettesting';
const testPort = process.env.PORT = 5000;

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const server = require(__dirname + '/../../../server');
const User = require(__dirname + '/../../../models/user');

describe('Public router endpoints', () => {
  before(() => {
    server.listen(testPort);
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(done);
    });
  });

  describe('/validate/user', () => {
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

    it('should respond with 400 if username is taken', done => {
      request('localhost:5000')
        .post('/api/validate/user')
        .send({ username: 'testusername' })
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('username taken');
          done();
        });
    });

    it('should respond with 200 if username is unique', done => {
      request('localhost:5000')
        .post('/api/validate/user')
        .send({ username: 'uniqueusername' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('username is available');
          done();
        });
    });
  });
});
