const errorCode = require("../constant/errorCode.js");
const Meta = require("../model/meta.js");
let mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB_META = "sc_app";

const createExpenseMeta = async (client_loc_id, year) => {
  if (client_loc_id === null || year === null) {
    console.error("Error creating metadata", error);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: error.message,
    };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });

    const db = client.db(MONGODB_META);
    const collection = db.collection("client_expense_meta");

    const existingMeta = await collection.findOne({
      client_loc_id: client_loc_id,
      year: parseInt(year),
    });

    if (existingMeta) {
      return existingMeta;
    } else {
      const metaData = new Meta({
        import_status: 1,
        client_loc_id: client_loc_id,
        timestamp: new Date().toISOString(),
        year: parseInt(year),
        last_expense_id: "",
      });

      await collection.insertOne(metaData);
      await client.close();

      return metaData;
    }
  } catch (error) {
    console.error("Error creating metadata", error);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: error.message,
    };
  }
};

const getExpenseMeta = async (client_loc_id, year) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB_META);
    const collection = db.collection("client_expense_meta");

    const result = await collection.findOne({
      client_loc_id: client_loc_id,
      year: parseInt(year),
    });

    if (result === null) {
      const metaData = new Meta({
        import_status: 1,
        client_loc_id: client_loc_id,
        timestamp: new Date().toISOString(),
        year: parseInt(year),
        last_expense_id: "",
      });

      await collection.insertOne(metaData);
      await client.close();

      return metaData;
    }

    await client.close();
    return result;
  } catch (e) {
    console.error("Error getting metaData", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateExpenseMeta = async (
  client_loc_id,
  year,
  last_expense_id,
  import_status,
) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB_META);
    const collection = db.collection("client_expense_meta");

    const filter = {
      client_loc_id,
      year: parseInt(year),
    };

    const update = {
      $set: {
        import_status: import_status,
        last_expense_id: last_expense_id,
      },
    };

    const result = await collection.findOneAndUpdate(filter, update);
    await client.close();

    if (result.value) {
      return result.value;
    } else {
      throw {
        code: errorCode.ERROR_NOT_FOUND,
        message: "Expense metadata not found for the provided criteria",
      };
    }
  } catch (e) {
    console.error("Error updating expenses metadata", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

module.exports = {
  createExpenseMeta,
  getExpenseMeta,
  updateExpenseMeta,
};
