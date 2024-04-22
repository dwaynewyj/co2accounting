const { body, query } = require("express-validator");

const validateUpdateCustomerAuth0UserImage = [
  query("user_id").exists().isString(),
  body("url").exists().isString(),
];

module.exports = validateUpdateCustomerAuth0UserImage;
