const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    const token = req.cookies.jwt;

    try {
      if (!token) {
        return res.redirect('/login');
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.render('../views/access');
      }
      req.user = decoded;
      next();
    } catch (e) {
      return res.redirect('/login');
    }
  };
};
