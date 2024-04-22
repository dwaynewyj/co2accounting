const { query } = require("express-validator");

const validateGetUploadHistory = [
  query("client_loc_id").exists().isString(),
  query("year").exists().isString(),
];

module.exports = validateGetUploadHistory;
