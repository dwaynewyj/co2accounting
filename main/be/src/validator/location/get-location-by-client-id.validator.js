const { query } = require("express-validator");

const validateGetLocationByClientId = [
  query("client_org_id").exists().isString(),
];

module.exports = validateGetLocationByClientId;
