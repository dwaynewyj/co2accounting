const { query } = require("express-validator");

const validateGetExpenseByLocationId = [
  query("client_loc_id").exists().isString(),
  query("year").exists().isString(),
];

module.exports = validateGetExpenseByLocationId;
