const { query } = require("express-validator");

const validateGetCustomerWidgetDetails = [
  query("ledger_name").exists().isString(),
  query("page_num").exists().isNumeric(),
];

module.exports = validateGetCustomerWidgetDetails;
