const { query } = require("express-validator");

const validateGetCustomerChargebeeInfo = [
  query("customer_id").exists().isString(),
];

module.exports = validateGetCustomerChargebeeInfo;
