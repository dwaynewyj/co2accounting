const { query } = require("express-validator");

const validateGetClientByCustomerId = [
  query("cust_org_id").exists().isString(),
];

module.exports = validateGetClientByCustomerId;
