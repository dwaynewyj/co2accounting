const { body } = require("express-validator");

const validateResetLocation = [
  body("_id").exists().isString(),
  body("year").exists().isString(),
];

module.exports = validateResetLocation;
