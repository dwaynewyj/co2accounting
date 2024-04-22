const { body } = require("express-validator");

const validateDeleteLocation = [body("_id").exists().isString()];

module.exports = validateDeleteLocation;
