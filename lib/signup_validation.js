const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/handle_db_error');

module.exports = exports = function(req, res, next) {
  // check for unique username
  User.find({ username: req.body.username }, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    if (data.length) return res.status(400).json({ msg: 'username taken' });
    next();
  });
};
