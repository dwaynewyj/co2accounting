const { query } = require("express-validator");

const validateChargebee = [
  query("subscription_id").exists().isString(),
  query("portal").exists().isString(),
];

module.exports = validateChargebee;
