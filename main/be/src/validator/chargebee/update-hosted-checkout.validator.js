const { body } = require("express-validator");

const validateUpdateHostedCheckout = [
  body("plan_id").exists().isString(),
  body("user_id").exists().isString(),
];

module.exports = validateUpdateHostedCheckout;
