const { body } = require("express-validator");

const validateCreateHostedCheckout = [
  body("plan_id").exists().isString(),
  body("user_id").exists().isString(),
  body("email").exists().isEmail(),
];

module.exports = validateCreateHostedCheckout;
