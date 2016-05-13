const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/waste_not');

const authRouter = require(__dirname + '/routes/auth_routes');
const inventoryRouter = require(__dirname + '/routes/inventory_routes');

app.use('/api', authRouter);
app.use('/api', inventoryRouter);
app.use(express.static(__dirname + '/dist'));
app.use('/data', express.static(__dirname + '/data'));

const PORT = process.env.PORT || 3000;
module.exports = exports = app
  .listen(PORT, () => console.log('Server started on port: ' + PORT));
