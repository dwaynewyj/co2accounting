const { body, query } = require("express-validator");

const validateUpdateClientById = [
  query("client_org_id").exists().isString(),
  body("name").exists().isString(),
  body("industry").exists().isString(),
  body("type").exists().isString(),
  body("phone").exists().isString(),
];

module.exports = validateUpdateClientById;
