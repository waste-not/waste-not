const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/waste_not');

const userRouter = require(__dirname + '/routes/user_routes');
const inventoryRouter = require(__dirname + '/routes/inventory_routes');

app.use('/api', userRouter);
app.use('/api', inventoryRouter);
app.use(express.static(__dirname + '/dist'));

var PORT = process.env.PORT || 3000;
var server = module.exports = exports = app.listen(PORT, () => console.log('Server started on port: ' + PORT));
