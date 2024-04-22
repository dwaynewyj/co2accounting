const config = require("../constant/config");
const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const customerService = require("../service/customer.service");
const { generateTokens } = require("../util/jwt");

//==============================================================================
// DESCRIPTION: Create customer init
// ROUTE: POST http://localhost:8000/scustomer/
// PRE-CONDITION:
//    @body user_id             String
// POST-CONDITION:
//    Returns created user.
const createCustomerInit = async (req, res) => {
  const { user_id } = req.body;
  try {
    let customer = await customerService.createCustomerInit(user_id);
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Create customer
// ROUTE: POST http://localhost:8000/scustomer/
// PRE-CONDITION:
//    @body user_id             String
//    @body plan_id             String
//    @body subscription_id     String
//    @body name                 String
//    @body email                 String
//    @body phone                 String
// POST-CONDITION:
//    Returns created user.
const createSCustomer = async (req, res) => {
  const { user_id, plan_id, subscription_id, name, email, phone } = req.body;
  try {
    let customer = await customerService.createSCustomer(
      user_id,
      plan_id,
      subscription_id,
      name,
      email,
      phone,
    );
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get customer by ID
// ROUTE: GET http://localhost:8000/scustomer/
// PRE-CONDITION:
//    @query  id
// POST-CONDITION:
//    Returns customer
const getSCustomerById = async (req, res) => {
  const { id } = req.query;
  try {
    let customer = await customerService.getSCustomerById(id);
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Create legacy customer
// ROUTE: POST http://localhost:8000/scustomer/
// PRE-CONDITION:
//    @body user_id             String
//    @body plan_id             String
//    @body subscription_id     String
// POST-CONDITION:
//    Returns created user.
const createCustomer = async (req, res) => {
  const { user_id, subscription_id, plan_id } = req.body;
  try {
    let customer = await customerService.createCustomer(
      user_id,
      subscription_id,
      plan_id,
    );
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Update legacy customer
// ROUTE: POST http://localhost:8000/scustomer/
// PRE-CONDITION:
//    @query id             String
//    @body plan_id             String
//    @body subscription_id     String
//    @body name                 String
//    @body email                 String
//    @body phone                 String
// POST-CONDITION:
//    Returns created user.
const updateCustomerById = async (req, res) => {
  const { id } = req.query;
  const { plan_id, subscription_id, name, email, phone } = req.body;
  try {
    let customer = await customerService.updateCustomer(
      id,
      plan_id,
      subscription_id,
      name,
      email,
      phone,
    );
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy customer by ID
// ROUTE: GET http://localhost:8000/customer/
// PRE-CONDITION:
//    @query  id
// POST-CONDITION:
//    Returns customer
const getCustomerById = async (req, res) => {
  const { id } = req.query;
  try {
    let customer = await customerService.getCustomerById(id);
    const { refreshToken, accessToken } = generateTokens(customer);
    res.setHeader("x-access-token", accessToken);
    res.setHeader("x-refresh-token", refreshToken);
    res.setHeader(
      "Access-Control-Expose-Headers",
      "x-access-token, x-refresh-token",
    );
    return res.status(errorCode.SUCCESS).json({ customer: customer });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy customer chargebee info by customer ID
// ROUTE: GET http://localhost:8000/customer/chargebee
// PRE-CONDITION:
//    @query  customer_id
// POST-CONDITION:
//    Returns chargebee info
const getCustomerChargebeeInfo = async (req, res) => {
  const { customer_id } = req.query;
  try {
    let info = await customerService.getCustomerChargebeeInfo(customer_id);
    return res.status(errorCode.SUCCESS).json({ data: info });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Update legacy customer Auth0 user info by user ID
// ROUTE: PUT http://localhost:8000/customer/auth0
// PRE-CONDITION:
//    @query  user_id
//    @body  email
//    @body  name
//    @body  nickname
// POST-CONDITION:
//    Returns Auth0 user
const updateCustomerAuth0User = async (req, res) => {
  const { user_id } = req.query;
  const { email, name, nickname } = req.body;
  try {
    let user = await customerService.updateCustomerAuth0User(
      user_id,
      email,
      name,
      nickname,
    );
    return res.status(errorCode.SUCCESS).json({ user: user });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Update legacy customer Auth0 user image by user ID
// ROUTE: PUT http://localhost:8000/customer/auth0/image
// PRE-CONDITION:
//    @query  user_id
//    @body  url
// POST-CONDITION:
//    Returns Auth0 user
const updateCustomerAuth0UserImage = async (req, res) => {
  const { user_id } = req.query;
  const { url } = req.body;
  try {
    let user = await customerService.updateCustomerAuth0UserImage(user_id, url);
    return res.status(errorCode.SUCCESS).json({ user: user });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

module.exports = {
  createCustomerInit,
  createCustomer,
  updateCustomerById,
  getCustomerById,
  getSCustomerById,
  createSCustomer,
  getCustomerChargebeeInfo,
  updateCustomerAuth0User,
  updateCustomerAuth0UserImage,
};
