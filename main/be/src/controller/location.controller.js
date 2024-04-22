const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const locationService = require("../service/location.service");

//==============================================================================
// DESCRIPTION: Create legacy client by customer ID
// ROUTE: GET http://localhost:8000/location/
// PRE-CONDITION:
//    @body  client_org_id
//    @body  name
//    @body  industry
//    @body  type
//    @body  phone
// POST-CONDITION:
//    Returns [client]
const createLocation = async (req, res) => {
  const {
    client_org_id,
    name,
    address,
    city,
    state,
    country,
    zip,
    phone,
  } = req.body;
  try {
    let location = await locationService.createLocation(
      client_org_id,
      name,
      address,
      city,
      state,
      country,
      zip,
      phone
    );
    return res.status(errorCode.SUCCESS).json({ location: location });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Reset legacy location by ID
// ROUTE: GET http://localhost:8000/location/reset
// PRE-CONDITION:
//    @body  _id
//    @body  year
// POST-CONDITION:
//    Returns location
const resetLocation = async (req, res) => {
  const { _id, year } = req.body;
  try {
    let location = await locationService.resetLocation(_id, year);
    return res.status(errorCode.SUCCESS).json({ location: location });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Delete legacy location by ID
// ROUTE: GET http://localhost:8000/location/delete
// PRE-CONDITION:
//    @body  _id
// POST-CONDITION:
//    Returns status
const deleteLocation = async (req, res) => {
  const { _id } = req.body;
  try {
    let deleted = await locationService.deleteLocation(_id);
    return res.status(errorCode.SUCCESS).json({ status: deleted });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Create legacy location by ID
// ROUTE: GET http://localhost:8000/location/
// PRE-CONDITION:
//    @body  client_org_id
//    @body  name
//    @body  industry
//    @body  type
//    @body  phone
// POST-CONDITION:
//    Returns location
const updateLocation = async (req, res) => {
  const { data } = req.body;
  try {
    let location = await locationService.updateLocation(data);
    return res.status(errorCode.SUCCESS).json({ location: location });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy location by client ID
// ROUTE: GET http://localhost:8000/location/
// PRE-CONDITION:
//    @query  cust_org_id
// POST-CONDITION:
//    Returns [location]
const getLocationByClientId = async (req, res) => {
  const { client_org_id } = req.query;
  try {
    let locations = await locationService.getLocationByClientId(client_org_id);
    return res.status(errorCode.SUCCESS).json({ locations: locations });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

module.exports = {
  createLocation,
  resetLocation,
  deleteLocation,
  updateLocation,
  getLocationByClientId,
};
