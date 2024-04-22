const { body } = require("express-validator");

const validateCreateClient = [
  body("cust_org_id").exists().isString(),
  body("name").exists().isString(),
  body("industry").exists().isString(),
  body("type").exists().isString(),
  body("phone").exists().isString(),
];

module.exports = validateCreateClient;
