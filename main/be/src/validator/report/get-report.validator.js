const { query } = require("express-validator");

const validateGetReport = [
  query("client_loc_id").exists().isString(),
  query("user_id").exists().isString(),
  query("qty_records").exists().isNumeric(),
  query("page_num").exists().isNumeric(),
  query("year").exists().isString(),
];

module.exports = validateGetReport;
