const logger = require("./logger.service");
const errorCode = require("../constant/errorCode.js");
const errorMessage = require("../constant/errorMessage.js");
const { generateAccessToken } = require("../util/jwt");
let mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const AWS = require("aws-sdk");
const fs = require("fs");
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

const createLocation = async (
  client_org_id,
  name,
  address,
  city,
  state,
  country,
  zip,
  phone
) => {
  try {
    const mclient = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = mclient.db(MONGODB);
    const collection = db.collection("client_locs");

    const query = {
      client_org_id: client_org_id,
      client_loc_data: {
        client_loc_name: name,
        client_loc_address: address,
        client_loc_city: city,
        client_loc_state: state,
        client_loc_country: country,
        client_loc_zip: zip,
        client_loc_phoneNumber: phone,
      },
      created_at: new Date(),
    };
    const location = await collection.insertOne(query);
    const result = await collection.findOne({ _id: location.insertedId });
    await mclient.close();

    return result;
  } catch (e) {
    console.error("Error creating location", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const resetLocation = async (client_loc_id, year) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db("sc_app_ledgers");
    // const collection = db.collection("client_locs");
    // Delete files from S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    });
    const prefix = `${client_loc_id}/${year}`;
    const data = await s3
      .listObjectsV2({
        Bucket: `${process.env.AWS_S3_LOCATION_BUCKET}`,
        Prefix: prefix,
      })
      .promise();

    const deletePromises = data.Contents.map((obj) => {
      const deleteParams = {
        Bucket: `${process.env.AWS_S3_LOCATION_BUCKET}`,
        Key: obj.Key,
      };
      return s3.deleteObject(deleteParams).promise();
    });

    // Remove expense collection from database
    const collectionName = `${client_loc_id}_${year}`;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);
    const collectionExists = collectionNames.includes(collectionName);

    if (collectionExists) {
      const collection = db.collection(collectionName);
      await collection.drop();
    }

    const dbLocation = client.db(MONGODB);
    const collectionLocation = dbLocation.collection("client_locs");
    const result = await collectionLocation.findOne({
      _id: ObjectId(client_loc_id),
    });
    await client.close();

    return result;
  } catch (e) {
    console.error("Error resetting location", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const deleteLocation = async (client_loc_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("client_locs");
    const filter = { _id: ObjectId(client_loc_id) };
    const result = await collection.deleteOne(filter);
    await client.close();
    return result?.result?.ok;
  } catch (e) {
    console.error("Error resetting location", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateLocation = async (data) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("client_locs");
    const query = { data };
    const originalLocation = await collection.findOne({
      _id: ObjectId(data._id),
    });

    const addressOperation = data?.address
      ? {
          client_loc_address: data?.address?.address,
          client_loc_city: data?.address?.city,
          client_loc_state: data?.address?.country,
          client_loc_country: data?.address?.state,
          client_loc_zip: data?.address?.zip,
        }
      : { ...originalLocation.client_loc_data };

    const updateOperation = {
      $set: {
        client_loc_data: {
          ...addressOperation,
          client_loc_name: data?.name,
          client_loc_phoneNumber: data?.phone,
        },
        threshold: data?.threshold ?? 0,
      },
    };
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(data._id) },
      updateOperation
    );
    const location = await collection.findOne({ _id: ObjectId(data._id) });
    await client.close();

    return location;
  } catch (e) {
    console.error("Error updating location", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getLocationByClientId = async (client_org_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("client_locs");
    const query = { client_org_id: client_org_id };
    const result = await collection
      .find(query)
      .sort({ "client_loc_data.client_loc_name": -1 })
      .toArray();
    await client.close();

    return result;
  } catch (e) {
    console.error("Error retrieving locations", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

module.exports = {
  createLocation,
  resetLocation,
  deleteLocation,
  updateLocation,
  getLocationByClientId,
};
