const swaggerUi = require("swagger-ui-express");
const serverDocumentation = require("../../server.docs.json");

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  explorer: true,
};

const serve = [swaggerUi.serve, swaggerUi.setup(serverDocumentation, options)];

module.exports = {
  serve,
};
