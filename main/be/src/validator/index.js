const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

module.exports = {
  //============================================================================
  // Customer
  //============================================================================
  createCustomerInit: [
    ...require("./customer/create-customer-init.validator"),
    validate,
  ],
  createSCustomer: [
    ...require("./customer/create-scustomer.validator"),
    validate,
  ],
  getSCustomerById: [
    ...require("./customer/get-scustomer-by-id.validator"),
    validate,
  ],

  createCustomer: [
    ...require("./customer/create-customer.validator"),
    validate,
  ],
  updateCustomerById: [
    ...require("./customer/update-customer-by-id.validator"),
    validate,
  ],
  getCustomerById: [
    ...require("./customer/get-customer-by-id.validator"),
    validate,
  ],

  getCustomerChargebeeInfo: [
    ...require("./customer/get-customer-chargebee-info.validator"),
    validate,
  ],

  updateCustomerAuth0User: [
    ...require("./customer/update-customer-auth0-user.validator"),
    validate,
  ],
  updateCustomerAuth0UserImage: [
    ...require("./customer/update-customer-auth0-user-image.validator"),
    validate,
  ],
  //============================================================================
  // Client
  //============================================================================
  createClient: [...require("./client/create-client.validator"), validate],
  updateClientById: [
    ...require("./client/update-client-by-id.validator"),
    validate,
  ],
  getClientByCustomerId: [
    ...require("./client/get-client-by-customer-id.validator"),
    validate,
  ],
  getClientsMenu: [...require("./client/get-clients-menu.validator"), validate],
  //============================================================================
  // Location
  //============================================================================
  createLocation: [
    ...require("./location/create-location.validator"),
    validate,
  ],
  resetLocation: [...require("./location/reset-location.validator"), validate],
  deleteLocation: [
    ...require("./location/delete-location.validator"),
    validate,
  ],
  updateLocation: [
    ...require("./location/update-location.validator"),
    validate,
  ],
  getLocationByClientId: [
    ...require("./location/get-location-by-client-id.validator"),
    validate,
  ],

  //============================================================================
  // Expense
  //============================================================================
  createSingleExpense: [
    ...require("./expense/create-single-expense.validator"),
    validate,
  ],
  getExpenseByLocationId: [
    ...require("./expense/get-expense-by-location-id.validator"),
    validate,
  ],
  archiveExpenseById: [
    ...require("./expense/archive-expense-by-id.validator"),
    validate,
  ],
  getCustomerScope: [
    ...require("./expense/get-customer-widget-details.validator"),
    validate,
  ],
  getCustomerGhg: [
    ...require("./expense/get-customer-widget-details.validator"),
    validate,
  ],
  getCustomerAssurance: [
    ...require("./expense/get-customer-widget-details.validator"),
    validate,
  ],
  getCustomerThreshold: [
    ...require("./expense/get-customer-widget-details.validator"),
    validate,
  ],

  //============================================================================
  // Report
  //============================================================================
  generateReport: [...require("./report/generate-report.validator"), validate],
  generateInventoryReport: [
    ...require("./report/generate-inventory-report.validator"),
    validate,
  ],
  getReport: [...require("./report/get-report.validator"), validate],
  getUploadHistory: [
    ...require("./report/get-upload-history.validator"),
    validate,
  ],

  //============================================================================
  // Chargebee
  //============================================================================
  chargebee: [...require("./chargebee/chargebee.validator"), validate],
  createHostedCheckout: [
    ...require("./chargebee/create-hosted-checkout.validator"),
    validate,
  ],
  updateHostedCheckout: [
    ...require("./chargebee/update-hosted-checkout.validator"),
    validate,
  ],
  getCheckoutInfo: [
    ...require("./chargebee/get-checkout-info.validator"),
    validate,
  ],
};
