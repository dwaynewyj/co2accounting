const { body } = require("express-validator");

const validateCreateLocation = [
  body("client_org_id").exists().isString(),
  body("name").exists().isString(),
  body("address").exists().isString(),
  body("city").exists().isString(),
  body("state").exists().isString(),
  body("country").exists().isString(),
  body("zip").exists().isString(),
  body("phone").exists().isString(),
];

module.exports = validateCreateLocation;
