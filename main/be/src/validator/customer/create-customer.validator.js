const { body } = require("express-validator");

const validateCreateCustomer = [
  body("user_id").exists().isString(),
  body("plan_id").exists().isString(),
  body("subscription_id").exists().isString(),
];

module.exports = validateCreateCustomer;
