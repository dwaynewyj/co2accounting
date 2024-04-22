const { body } = require("express-validator");

const validateCreateLocation = [body("data").exists().isObject()];

module.exports = validateCreateLocation;
