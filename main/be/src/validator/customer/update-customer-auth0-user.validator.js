const { body, query } = require("express-validator");

const validateUpdateCustomerAuth0User = [
  query("user_id").exists().isString(),
  body("email").exists().isEmail(),
  body("name").exists().isString(),
  body("nickname").exists().isString(),
];

module.exports = validateUpdateCustomerAuth0User;
