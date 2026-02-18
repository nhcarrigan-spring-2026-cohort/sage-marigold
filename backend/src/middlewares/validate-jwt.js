const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided'
    });
  }

  try {
    const { uid, full_name } = jwt.verify(token, process.env.JWT_SECRET);

    // Set req.user object for consistency with controllers
    req.user = {
      id: uid,
      full_name
    };

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }
};

module.exports = {
  validateJWT
};