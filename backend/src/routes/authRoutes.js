const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { registerUser, loginUser, renewToken } = require('../controllers/authController');


router.post(
    '/register',
    [ // middlewares
        check('username', 'Name is required').not().isEmpty(),
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ], 
    registerUser
);


router.post(
    '/login',
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser);


router.get('/renew', renewToken);




module.exports = router;