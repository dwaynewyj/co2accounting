const logger = require("./logger.service");
const errorCode = require("../constant/errorCode.js");
const errorMessage = require("../constant/errorMessage.js");
const { generateAccessToken } = require("../util/jwt");
let mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const locationService = require("./location.service");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app";

// const serializeClient = (customer) => {
//   if (!customer) {
//     return null;
//   }
//   return {
//     _id: customer._id,
//     info: customer.info,
//     users: customer.users,
//     created_at: customer.createdAt,
//     updated_at: customer.updatedAt,
//   };
// };

const createClient = async (cust_org_id, name, industry, type, phone) => {
  try {
    const mclient = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = mclient.db(MONGODB);
    const collection = db.collection("client_orgs");

    const query = {
      cust_org_id: cust_org_id,
      client_org_data: {
        client_org_name: name,
        client_org_industry: industry,
        client_org_type: type,
        client_org_phoneNumber: phone,
      },
    };
    const client = await collection.insertOne(query);
    const result = await collection.findOne({ _id: client.insertedId });
    await mclient.close();
    return result;
  } catch (e) {
    console.error("Error creating client", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateClientById = async (client_org_id, name, industry, type, phone) => {
  try {
    const mclient = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = mclient.db(MONGODB);
    const collection = db.collection("client_orgs");
    const updateOperation = {
      $set: {
        client_org_data: {
          client_org_name: name,
          client_org_industry: industry,
          client_org_type: type,
          client_org_phoneNumber: phone,
        },
      },
    };
    const result = await collection.findOneAndUpdate(
      {
        _id: ObjectId(client_org_id),
      },
      updateOperation
    );
    const client = await collection.findOne({ _id: ObjectId(client_org_id) });
    await mclient.close();
    return client;
  } catch (e) {
    console.error("Error updating client", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getClientByCustomerId = async (cust_org_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("client_orgs");
    const query = { cust_org_id: cust_org_id };
    const result = await collection
      .find(query)
      .sort({ "client_org_data.client_org_name": -1 })
      .toArray();
    await client.close();
    return result;
  } catch (e) {
    console.error("Error retrieving clients", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getClientsMenu = async (cust_org_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("client_orgs");
    const query = { cust_org_id: cust_org_id };
    const result = await collection
      .find(query)
      .sort({ "client_org_data.client_org_name": -1 })
      .toArray();
    for (const client of result) {
      const locations = await locationService.getLocationByClientId(
        client._id.toString()
      );
      client["locations"] = locations;
    }
    await client.close();
    return result;
  } catch (e) {
    console.error("Error retrieving clients", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

module.exports = {
  createClient,
  updateClientById,
  getClientByCustomerId,
  getClientsMenu,
};
