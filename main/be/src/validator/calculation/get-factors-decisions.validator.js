const { body } = require("express-validator");

const validateChargebee = [
  body("Decision1").isString(),
  body("Decision2").isString(),
  body("Decision3").isString(),
  body("Decision4").isString(),
  body("Decision5").isString(),
  body("Decision6").isString(),
  body("Decision7").isString(),
];

module.exports = validateChargebee;
