const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const { createRequest } = require('../controllers/requestController');

router.post('/application-form', [validateJWT], createRequest);

module.exports = router;
