const { query } = require("express-validator");

const validateGetClientsMenu = [query("cust_org_id").exists().isString()];

module.exports = validateGetClientsMenu;
