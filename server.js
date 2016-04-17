const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/waste_not');

const authRouter = require(__dirname + '/routes/auth_routes');
// const userRouter = require(__dirname + '/routes/user_routes');
const inventoryRouter = require(__dirname + '/routes/inventory_routes');

app.use('/api', authRouter);
// app.use('/api', userRouter);
app.use('/api', inventoryRouter);

const PORT = process.env.PORT || 3000;
module.exports = exports = app.listen(PORT, () => console.log('Server started on port: ' + PORT));
