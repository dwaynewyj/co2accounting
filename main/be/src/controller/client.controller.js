const config = require("../constant/config");
const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const clientService = require("../service/client.service");

//==============================================================================
// DESCRIPTION: Create legacy client by customer ID
// ROUTE: POST http://localhost:8000/client/
// PRE-CONDITION:
//    @body  cust_org_id
//    @body  name
//    @body  industry
//    @body  type
//    @body  phone
// POST-CONDITION:
//    Returns [client]
const createClient = async (req, res) => {
  const { cust_org_id, name, industry, type, phone } = req.body;
  try {
    let client = await clientService.createClient(
      cust_org_id,
      name,
      industry,
      type,
      phone
    );
    return res.status(errorCode.SUCCESS).json({ client: client });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Update legacy client by client ID
// ROUTE: PUT http://localhost:8000/client/
// PRE-CONDITION:
//    @query  client_org_id
//    @body  name
//    @body  industry
//    @body  type
//    @body  phone
// POST-CONDITION:
//    Returns [client]
const updateClientById = async (req, res) => {
  const { client_org_id } = req.query;
  const { name, industry, type, phone } = req.body;
  try {
    let client = await clientService.updateClientById(
      client_org_id,
      name,
      industry,
      type,
      phone
    );
    return res.status(errorCode.SUCCESS).json({ client: client });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy client by customer ID
// ROUTE: GET http://localhost:8000/client/
// PRE-CONDITION:
//    @query  cust_org_id
// POST-CONDITION:
//    Returns [client]
const getClientByCustomerId = async (req, res) => {
  const { cust_org_id } = req.query;
  try {
    let clients = await clientService.getClientByCustomerId(cust_org_id);
    return res.status(errorCode.SUCCESS).json({ clients: clients });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy clients menu format by customer ID
// ROUTE: GET http://localhost:8000/clients/menu
// PRE-CONDITION:
//    @query  cust_org_id
// POST-CONDITION:
//    Returns [{...client, [client location]}]
const getClientsMenu = async (req, res) => {
  const { cust_org_id } = req.query;
  try {
    let clients = await clientService.getClientsMenu(cust_org_id);
    return res.status(errorCode.SUCCESS).json({ clients: clients });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

module.exports = {
  createClient,
  updateClientById,
  getClientByCustomerId,
  getClientsMenu,
};
