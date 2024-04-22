const { body, query } = require("express-validator");

const validateArchiveExpenseById = [
  query("id").exists().isString(),
  query("client_loc_id").exists().isString(),
  query("year").exists().isString(),
  body("archive").exists().isBoolean(),
];

module.exports = validateArchiveExpenseById;
