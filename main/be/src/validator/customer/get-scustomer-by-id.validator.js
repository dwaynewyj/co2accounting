const { query } = require("express-validator");

const validateGetSCustomerById = [query("id").exists().isString()];

module.exports = validateGetSCustomerById;
