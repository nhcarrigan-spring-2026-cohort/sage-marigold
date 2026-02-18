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
    console.error('JWT Validation Error:', error.message);
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
