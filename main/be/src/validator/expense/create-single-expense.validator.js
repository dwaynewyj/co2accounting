const { body, query } = require("express-validator");

const validateCreateSingleExpense = [
  body("client_loc_id").exists().isString(),
  body("year").exists().isString(),
  body("date").exists().isString(),
  body("payee").exists().isString(),
  body("gl").exists().isString(),
  body("amount").exists().isString(),
];

module.exports = validateCreateSingleExpense;
