const expect = require('chai').expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/waste_not_test';
process.env.APP_SECRET = 'secrettesting';
const testPort = process.env.PORT = 5000;

const fs = require('fs');
const mongoose = require('mongoose');
const server = require(__dirname + '/../../../server');
const Inventory = require(__dirname + '/../../../models/inventory');
const renderCSV = require(__dirname + '/../../../lib/render_csv');

describe('UNIT: LIB: Render CSV', () => {
  before(() => {
    server.listen(testPort);
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(done);
    });
  });

  this.testCSVPath = 'test/backend/test.csv';
  after(done => {
    fs.unlink(this.testCSVPath, done);
  });

  it('should perform a lookup in the inventory DB', done => {
    renderCSV(this.testCSVPath)
      .then(doc => {
        expect(doc).to.be.an('array');
        done();
      });
  });

  it('should write an empty file for an empty DB', done => {
    renderCSV(this.testCSVPath)
      .then(() => {
        fs.readFile(this.testCSVPath, 'utf-8', (err, data) => {
          if (err) console.log(err);
          expect(err).to.eql(null);

          expect(data.toString()).to.eql('');
          done();
        });
      });
  });

  describe('Functionality that requires existing inventory data', () => {
    before(done => {
      var newInventory = new Inventory({
        title: 'New Item',
        createDate: Date.now(),
        createdBy: 'creator_id',
        deadlineDate: Date.now() + 600000,
        description: 'Item description',
        perishable: true,
        address: '2901 3rd Avenue, Seattle WA 98121',
        coordinates: {
          lat: 47.6182206,
          lng: -122.3540207
        },
        category: 'Food',
        claimedBy: ''
      });

      newInventory.save((err, data) => {
        if (err) console.log(err);
        this.itemId = data._id;
        this.coord = data.coordinates;
        done();
      });
    });

    it('should write data to a CSV file', done => {
      renderCSV(this.testCSVPath)
        .exec()
        .then(() => {
          fs.readFile(this.testCSVPath, 'utf-8', (err, data) => {
            if (err) console.log(err);
            expect(err).to.eql(null);

            var fileData = data.toString().split('\n');
            expect(fileData[0]).to.eql('_id,latitude,longitude');
            expect(fileData[1]).to
              .eql(`${this.itemId},${this.coord.lat},${this.coord.lng}`);
            done();
          });
        });
    });
  });
});
