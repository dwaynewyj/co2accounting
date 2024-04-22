const { query } = require("express-validator");

const validateGenerateReport = [
  query("client_loc_id").exists().isString(),
  query("year").exists().isString(),
];

module.exports = validateGenerateReport;
