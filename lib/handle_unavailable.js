module.exports = exports = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'Unavailable username'});
};
