const { param } = require('express-validator');
const { validateFields } = require('./validate-fields');

// A middleware helper that validates a specific URL parameter as UUID

const validateUUID = (paramName) => {
  return [
    param(paramName, `${paramName} must be a valid UUID`).isUUID(),
    validateFields, // This trriggers the 400 error if the above fails
  ];
};

module.exports = { validateUUID };
