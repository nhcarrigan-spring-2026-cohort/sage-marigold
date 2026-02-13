const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided',
    });
  }

  try {
    const { uid, full_name } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.full_name = full_name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
