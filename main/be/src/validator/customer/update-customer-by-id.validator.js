const { query, body } = require("express-validator");

const validateUpdateCustomerById = [
  query("id").exists().isString(),
  body("plan_id").exists().isString(),
  body("subscription_id").exists().isString(),
  body("name").exists().isString(),
  body("email").exists().isString(),
  body("phone").exists().isString(),
];

module.exports = validateUpdateCustomerById;
