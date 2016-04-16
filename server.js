const express = require('express');
const mongoose = require('mongoose');
const db = require(__dirname + '/lib/db');

const PORT = process.env.PORT || 8080;
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

mongoose.connect(process.env.MONGO_URI || db.url);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authentication, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Dashboard Router
const dashboardRouter = require(__dirname + '/routes/dashboard_router')(io);
app.use('/dashboard', dashboardRouter);

// Listen
http.listen(PORT, () => {
  console.log('Server live on port ', PORT);
});

module.exports = exports = io;
