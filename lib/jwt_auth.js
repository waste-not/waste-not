const jwt = require('jsonwebtoken');
const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/handle_db_error');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded =
      jwt.verify(req.headers.token, process.env.APP_SECRET || 'test secret');
  } catch (e) {
    return res.status(401).json({ msg: 'invalid token' });
  }


  User.findOne({ _id: decoded.id }, (err, user) => {
    if (err) return handleDBError(err, res);
    if (!user) return res.status(401).json({ msg: 'invalid token' });

    req.user = user;
    next();
  });
};
