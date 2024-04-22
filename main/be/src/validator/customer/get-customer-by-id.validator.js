const { query } = require("express-validator");

const validateGetCustomerById = [query("id").exists().isString()];

module.exports = validateGetCustomerById;
