const express = require("express");

require("dotenv").config();
console.log("Node env is: " + process.env.NODE_ENV);
const app = express();

const fs = require("fs");
const path = require("path");
const cors = require("cors");
var winston = require("winston");
const aws = require("aws-sdk");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const logger = require("./src/service/logger.service");
const customerController = require("./src/controller/customer.controller");
const clientController = require("./src/controller/client.controller");
const locationController = require("./src/controller/location.controller");
const expenseController = require("./src/controller/expense.controller");
const reportController = require("./src/controller/report.controller");
const documentationController = require("./src/controller/documentation.controller");
const chargebeeController = require("./src/controller/chargebee.controller");
const calculationController = require("./src/controller/calculation.controller");

const s3Controller = require("./src/aws/s3.controller");

const validator = require("./src/validator");
const { authenticateTokens } = require("./src/util/jwt");

const basicAuthentication = basicAuth({
  users: { admin: process.env.ADMIN_PASSWORD }, // Fixed for testing
  challenge: true,
  unauthorizedResponse: "Error Unauthorized.",
});

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));
app.get("/", basicAuthentication, function (req, res) {
  res.status(200).send({ message: "ACK", version: "20191128" });
});

//==============================================================================
// Customer
//==============================================================================

/*
 * Create SCustomer organization
 * @precondition POST /scustomer
 * @body {user_id} - string
 * @body {plan_id} - string
 * @body {subscription_id} - string
 */
app.post(
  "/api/scustomer",
  validator.createSCustomer,
  customerController.createSCustomer,
);

/*
 * Get SCustomer organization by ID
 * @precondition GET /scustomer
 * @query {id} - string
 */
app.get(
  "/api/scustomer",
  validator.getSCustomerById,
  customerController.getSCustomerById,
);

/*
 * Create legacy customer organization init template
 * @precondition POST /customer
 * @body {user_id} - string
 */
app.post(
  "/api/customer/init",
  validator.createCustomerInit,
  customerController.createCustomerInit,
);

/*
 * Create legacy customer organization
 * @precondition POST /customer
 * @body {user_id} - string
 */
app.post(
  "/api/customer",
  validator.createCustomer,
  customerController.createCustomer,
);

/*
 * Update legacy customer organization
 * @precondition PUT /customer
 * @body {plan_id} - string
 * @body {subscription_id} - string
 */
app.put(
  "/api/customer",
  validator.updateCustomerById,
  customerController.updateCustomerById,
);

/*
 * Get legacy customer organization by ID
 * @precondition GET /customer
 * @query {id} - string
 */
app.get(
  "/api/customer",
  validator.getCustomerById,
  customerController.getCustomerById,
);

/*
 * Get legacy customer chargebee info by ID
 * @precondition GET /customer/chargebee
 * @query {customer_id} - string
 */
app.get(
  "/api/customer/chargebee",
  authenticateTokens,
  validator.getCustomerChargebeeInfo,
  customerController.getCustomerChargebeeInfo,
);

/*
 * Update legacy customer Auth0 info by user ID
 * @precondition PUT /customer/auth0
 * @query {user_id} - string
 * @body  {email} - string
 * @body  {name} - string
 * @body  {nickname} - string
 */
app.put(
  "/api/customer/auth0",
  // validator.updateCustomerAuth0User,
  customerController.updateCustomerAuth0User,
);

/*
 * Update legacy customer Auth0 image by user ID
 * @precondition PUT /customer/auth0/image
 * @query {user_id} - string
 * @body  {url} - string
 */
app.put(
  "/api/customer/auth0/image",
  authenticateTokens,
  validator.updateCustomerAuth0UserImage,
  customerController.updateCustomerAuth0UserImage,
);

//==============================================================================
// Client
//==============================================================================

/*
 * Create legacy client organization
 * @precondition POST /client
 * @body {cust_org_id} - string
 * @body {name} - string
 * @body {email} - string
 * @body {phone} - string
 */
app.post("/api/client", validator.createClient, clientController.createClient);

/*
 * Update legacy client organization
 * @precondition POST /client
 * @query {client_org_id} - string
 * @body {name} - string
 * @body {industry} - string
 * @body {phone} - string
 * @body {type} - string
 */
app.put(
  "/api/client",
  authenticateTokens,
  validator.updateClientById,
  clientController.updateClientById,
);

/*
 * Get legacy client organization by customer ID
 * @precondition GET /client
 * @query {cust_org_id} - string
 */
app.get(
  "/api/client",
  authenticateTokens,
  validator.getClientByCustomerId,
  clientController.getClientByCustomerId,
);

/*
 * Get legacy client organization and locations menu format by customer ID
 * @precondition GET /clients/menu
 * @query {cust_org_id} - string
 */
app.get(
  "/api/clients/menu",
  authenticateTokens,
  validator.getClientsMenu,
  clientController.getClientsMenu,
);

//==============================================================================
// Location
//==============================================================================

/*
 * Create legacy client location
 * @precondition POST /location
 * @body {client_org_id} - string
 * @body {name} - string
 * @body {address} - string
 * @body {city} - string
 * @body {state} - string
 * @body {country} - string
 * @body {zip} - string
 * @body {phone} - string
 */
app.post(
  "/api/location",
  authenticateTokens,
  validator.createLocation,
  locationController.createLocation,
);

/*
 * Reset legacy client location uploaded database
 * @precondition POST /location/reset
 * @body {_id} - string
 * @body {year} - string
 */
app.post(
  "/api/location/reset",
  authenticateTokens,
  validator.resetLocation,
  locationController.resetLocation,
);

/*
 * Delete legacy client location uploaded database
 * @precondition POST /location/reset
 * @body {_id} - string
 */
app.post(
  "/api/location/delete",
  authenticateTokens,
  validator.deleteLocation,
  locationController.deleteLocation,
);

/*
 * Update legacy client location
 * @precondition PUT /location
 * @body {data} - location object
 */
app.put(
  "/api/location",
  authenticateTokens,
  validator.updateLocation,
  locationController.updateLocation,
);

/*
 * Get legacy location by client ID
 * @precondition GET /location
 * @query {client_org_id} - string
 */
app.get(
  "/api/location",
  authenticateTokens,
  validator.getLocationByClientId,
  locationController.getLocationByClientId,
);

//==============================================================================
// Expense
//==============================================================================

/*
 * Create legacy single expense
 * @precondition POST /expense/single
 * @query {client_loc_id} - string
 * @query {year} - string
 * @query {date} - string
 * @query {payee} - string
 * @query {gl} - string
 * @query {amount} - string
 */
app.post(
  "/api/expense/single",
  authenticateTokens,
  validator.createSingleExpense,
  expenseController.createSingleExpense,
);

/*
 * Get legacy expenses by location ID
 * @precondition GET /expense
 * @query {client_loc_id} - string
 * @query {year} - string
 */
app.get(
  "/api/expense",
  authenticateTokens,
  validator.getExpenseByLocationId,
  expenseController.getExpenseByLocationId,
);

/*
 * Archive legacy expenses by expense ID
 * @precondition PUT /expense/archive
 * @query  client_loc_id
 * @query  year
 * @query  id
 * @query  archive
 */
app.put(
  "/api/expense/archive",
  authenticateTokens,
  validator.archiveExpenseById,
  expenseController.archiveExpenseById,
);

/*
 * Get expense metadata by location ID
 * @precondition GET /expense/meta
 * @body {client_loc_id} - string
 * @body {year} - string
 */
app.get(
  "/api/expense/meta",
  authenticateTokens,
  expenseController.getExpenseMeta,
);

/*
 * Create expense metadata
 * @precondition POST /expense/meta
 * @body {client_loc_id} - string
 * @body {year} - string
 */
app.post(
  "/api/expense/meta",
  authenticateTokens,
  expenseController.createExpenseMeta,
);

/*
 * Update expense metadata
 * @precondition PUT /expense/meta
 * @body {client_loc_id} - string
 * @body {year} - string
 * @body {last_expense_id} - string
 * @body {import_status} - enum number 0 or 1
 */
app.put(
  "/api/expense/meta",
  authenticateTokens,
  expenseController.updateExpenseMeta,
);

/*
 * Fetch customer scope in dashboard
 * @precondition GET /expense/dashboard/scope
 * @query  ledger_name
 */
app.get(
  "/api/expense/dashboard/scope",
  authenticateTokens,
  validator.getCustomerScope,
  expenseController.getCustomerScope,
);

/*
 * Fetch customer ghg
 * @precondition GET /expense/dashboard/ghg
 * @query  ledger_name
 */
app.get(
  "/api/expense/dashboard/ghg",
  authenticateTokens,
  validator.getCustomerGhg,
  expenseController.getCustomerGhg,
);

/*
 * Fetch customer assurance
 * @precondition GET /expense/dashboard/assurance
 * @query  ledger_name
 */
app.get(
  "/api/expense/dashboard/assurance",
  authenticateTokens,
  validator.getCustomerAssurance,
  expenseController.getCustomerAssurance,
);

/*
 * Fetch customer threshold data
 * @precondition GET /expense/dashboard/threshold
 * @query  ledger_name
 */
app.get(
  "/api/expense/dashboard/threshold",
  authenticateTokens,
  validator.getCustomerThreshold,
  expenseController.getCustomerThreshold,
);

//==============================================================================

//==============================================================================
// Report
//==============================================================================

/*
 * Generate legacy report by location ID
 * @precondition POST /report
 * @query {client_loc_id} - string
 * @query {year} - string
 */
app.post(
  "/api/report",
  authenticateTokens,
  validator.generateReport,
  reportController.generateReport,
);

/*
 * Generate inventory report
 * @precondition POST /report/inventory
 */
app.post(
  "/api/report/inventory",
  authenticateTokens,
  validator.generateInventoryReport,
  reportController.generateInventoryReport,
);

/*
 * Get legacy report by location ID
 * @precondition GET /report
 * @query {user_id} - string
 * @query {client_loc_id} - string
 * @query {qty_records} - string
 * @query {page_num} - string
 */
app.get(
  "/api/report",
  authenticateTokens,
  validator.getReport,
  reportController.getReport,
);

/*
 * Get all uploaded file history by location ID and year
 * @precondition GET /history
 * @query {client_loc_id} - string
 * @query {year} - string
 */
app.get(
  "/api/history",
  authenticateTokens,
  validator.getUploadHistory,
  reportController.getUploadHistory,
);

app.post("/api/s3/image", basicAuthentication, s3Controller.uploadImage);

//==============================================================================

//==============================================================================
// Calculation
//==============================================================================

app.get(
  "/api/calculation/factors-decisions",
  // authenticateTokens,
  // validator.getFactorsDecisions,
  calculationController.getFactorsDecisions,
);

//==============================================================================

//==============================================================================
// Chargebee
//==============================================================================

app.get(
  "/api/chargebee/portal",
  validator.chargebee,
  chargebeeController.chargebeePortal,
);

app.post(
  "/api/chargebee/hosted-checkout",
  validator.createHostedCheckout,
  chargebeeController.createHostedCheckout,
);

app.put(
  "/api/chargebee/hosted-checkout",
  validator.updateHostedCheckout,
  chargebeeController.updateHostedCheckout,
);

app.get(
  "/api/chargebee/checkout-info",
  validator.getCheckoutInfo,
  chargebeeController.getCheckoutInfo,
);

app.get("/api/chargebee/plans", chargebeeController.getPlans);
//==============================================================================

//==============================================================================
// API Documentation
//==============================================================================

app.use("/api/docs", documentationController.serve);

//==============================================================================

// Function to create a hosted page URL for editing subscription
async function getHostedPageUrl(subscriptionId) {
  try {
    const result = await chargebee.hosted_page
      .update_payment_method({
        subscription_id: subscriptionId,
        redirect_url: "https://your-website.com/subscription/" + subscriptionId,
      })
      .request();
    return result.hosted_page.url;
  } catch (error) {
    return "";
  }
}

// NODE_ENV=dev  nodemon server.js
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at:", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

mongoose.connect(
  process.env.DB_URL,
  {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      logger.debug("we're connected to mongo");
    } else {
      logger.debug("!!! MONGO ERROR ------ NOT CONNECTED !!!");
    }
  },
);

const server = app.listen(8000, (err) => {
  if (err) {
    return console.error(err);
  }
  logger.debug("listening on port ", server.address().port);
});
