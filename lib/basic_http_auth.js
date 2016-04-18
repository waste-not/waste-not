module.exports = exports = function(req, res, next) {
  try {
    var authBuf = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
    var authArr = authBuf.toString().split(':');

    // zero-fill authBuf
    for (var i = 0; i < authBuf.length; i++) {
      authBuf.writeUInt8(0, i);
    }

    if (authArr[0].length && authArr[1].length) {
      req.basicHTTP = {
        username: authArr[0],
        password: authArr[1]
      };
      return next();
    }
  } catch (e) {
    console.log(e);
  }
  res.status(401).json({ msg: 'could not authenticate' });
};
