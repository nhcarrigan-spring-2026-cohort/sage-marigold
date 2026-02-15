const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
  registerUser,
  loginUser,
  renewToken,
} = require('../controllers/authController');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
  '/register',
  [
    // middlewares
    check('full_name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('location_address', 'Location address is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
