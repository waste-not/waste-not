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
const server = require(__dirname + '/../../server');
const User = require(__dirname + '/../../models/user');
const Inventory = require(__dirname + '/../../models/inventory');

describe('Inventory router', () => {
  before(() => {
    server.listen(testPort);
  });

  before(done => {
    var newUser = new User({
      username: 'existingusername',
      password: bcrypt.hashSync('existingpassword', 8),
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
    });

    newUser.save((err, data) => {
      if (err) console.log(err);
      this.token = data.generateToken();
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(done);
    });
  });

  it('should be able to get available claims', done => {
    request('localhost:5000')
      .get('/api/inventory/active')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to get donations claimed by user', done => {
    request('localhost:5000')
      .get('/api/inventory/claimed')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to get donation history', done => {
    request('localhost:5000')
      .get('/api/inventory/history')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to get all inventory', done => {
    request('localhost:5000')
      .get('/api/inventory')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to post new inventory', done => {
    var formData = {
      title: 'New Item',
      createDate: Date.now(),
      deadlineDate: Date.now() + 600000,
      description: 'Item description',
      perishable: true,
      address: '2901 3rd Avenue, Seattle WA 98121',
      category: 'Food'
    };

    request('localhost:5000')
      .post('/api/inventory')
      .send(formData)
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.contain.all.keys(['_id', 'coordinates',
          'createdBy', 'claimedBy']);
        done();
      });
  });

  describe('Routes that manipulate existing data', () => {
    beforeEach(done => {
      var newInventory = new Inventory({
        title: 'New Item',
        createDate: Date.now(),
        createdBy: 'creator_id',
        deadlineDate: Date.now() + 600000,
        description: 'Item description',
        perishable: true,
        address: '2901 3rd Avenue, Seattle WA 98121',
        category: 'Food',
        claimedBy: ''
      });

      newInventory.save((err, data) => {
        if (err) console.log(err);
        this.tempItem = data;
        done();
      });
    });

    it('should be able to update an item in inventory', done => {
      this.tempItem.description = 'Updated description';

      request('localhost:5000')
        .put('/api/inventory/' + this.tempItem._id)
        .send(this.tempItem)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated inventory');
          done();
        });
    });

    it('should be able to delete an item', done => {
      request('localhost:5000')
        .delete('/api/inventory/' + this.tempItem._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully deleted inventory');
          done();
        });
    });
  });

  describe('Routes that requires existing unclaimed items', () => {
    beforeEach(done => {
      var newInventory = new Inventory({
        title: 'New Item',
        createDate: Date.now(),
        createdBy: 'creator_id',
        deadlineDate: Date.now() + 600000,
        description: 'Item description',
        perishable: true,
        address: '2901 3rd Avenue, Seattle WA 98121',
        category: 'Food',
        claimedBy: ''
      });

      newInventory.save((err, data) => {
        if (err) console.log(err);
        this.tempItem = data;
        done();
      });
    });

    it('should be able to claim an item', done => {
      request('localhost:5000')
        .put('/api/inventory/claim/' + this.tempItem._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully claimed inventory');
          done();
        });
    });

    it('should be able to reject overlapping unclaims', done => {
      request('localhost:5000')
        .put('/api/inventory/unclaim/' + this.tempItem._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(410);
          expect(res.body.msg).to.eql('Inventory already unclaimed');
          done();
        });
    });
  });

  describe('Routes that requires existing claimed items', () => {
    beforeEach(done => {
      var newInventory = new Inventory({
        title: 'New Item',
        createDate: Date.now(),
        createdBy: 'creator_id',
        deadlineDate: Date.now() + 600000,
        description: 'Item description',
        perishable: true,
        address: '2901 3rd Avenue, Seattle WA 98121',
        category: 'Food',
        claimedBy: 'claimer_id'
      });

      newInventory.save((err, data) => {
        if (err) console.log(err);
        this.tempItem = data;
        done();
      });
    });

    it('should be able to reject overlapping claims', done => {
      request('localhost:5000')
        .put('/api/inventory/claim/' + this.tempItem._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(410);
          expect(res.body.msg).to.eql('Inventory already claimed');
          done();
        });
    });

    it('should be able to unclaim an item', done => {
      request('localhost:5000')
        .put('/api/inventory/unclaim/' + this.tempItem._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully unclaimed inventory');
          done();
        });
    });
  });
});
