const { query } = require("express-validator");

const validateGetCheckoutInfo = [
  query("user_id").exists().isString(),
  query("hosted_page_id").exists().isString(),
];

module.exports = validateGetCheckoutInfo;
