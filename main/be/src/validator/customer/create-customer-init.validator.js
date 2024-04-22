const { body } = require("express-validator");

const validateCreateCustomerInit = [body("user_id").exists().isString()];

module.exports = validateCreateCustomerInit;
