const logger = require("./logger.service");
const errorCode = require("../constant/errorCode.js");
const errorMessage = require("../constant/errorMessage.js");
const SCustomerSchema = require("../model/customer");
let mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const axios = require("axios");
const moment = require("moment");

const ManagementClient = require("auth0").ManagementClient;

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app";

const serializeCustomer = (customer) => {
  if (!customer) {
    return null;
  }
  return {
    _id: customer._id,
    info: customer.info,
    users: customer.users,
    created_at: customer.createdAt,
    updated_at: customer.updatedAt,
  };
};

const createCustomerInit = async (user_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("cust_orgs");

    const query = {
      user_ids: [user_id],
      subscription_id: null,
      plan_id: null,
    };
    const customer = await collection.insertOne(query);
    const result = await collection.findOne({ _id: customer.insertedId });
    await client.close();
    return result;
  } catch (e) {
    console.error("Error creating customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const createCustomer = async (user_id, subscription_id, plan_id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("cust_orgs");

    const exists = await collection.findOne({ subscription_id, plan_id });
    if (exists) {
      return exists;
    }

    const query = {
      user_ids: [user_id],
      subscription_id: subscription_id,
      plan_id: plan_id,
    };
    const customer = await collection.insertOne(query);
    const result = await collection.findOne({ _id: customer.insertedId });
    await client.close();

    return result;
  } catch (e) {
    console.error("Error creating customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateCustomerById = async (
  id,
  plan_id,
  subscription_id,
  name,
  email,
  phone,
) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("cust_orgs");
    const query = { user_ids: [id] };
    const customer = await collection.findOneAndUpdate({ _id: id }, query);

    await client.close();
  } catch (e) {
    console.error("Error updating customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getCustomerById = async (id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection("cust_orgs");
    const query = { _id: mongoose.Types.ObjectId(id) };
    const result = await collection.findOne(query);
    await client.close();
    return result;
  } catch (e) {
    console.error("Error retrieving customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getSCustomerById = async (id) => {
  try {
    const result = await SCustomerSchema.findOne({
      _id: mongoose.Types.ObjectId(id),
    }).lean();
    return serializeCustomer(result);
  } catch (e) {
    console.error("Error retrieving customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const createSCustomer = async (
  user_id,
  plan_id,
  subscription_id,
  name,
  email,
  phone,
) => {
  try {
    const existingCustomer = await SCustomerSchema.findOne({
      plan_id: plan_id,
      subscription_id: subscription_id,
    });
    if (existingCustomer) {
      return serializeCustomer(existingCustomer);
    }
    const result = await SCustomerSchema.create({
      plan_id: plan_id,
      subscription_id: subscription_id,
      info: { name: name, email: email, phone: phone },
      users: [{ user_id: user_id }],
    });
    return serializeCustomer(result);
  } catch (e) {
    console.error("Error creating customer", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getCustomerChargebeeInfo = async (customer_id) => {
  try {
    const site =
      process.env.NODE_ENV === "STAGING" || process.env.NODE_ENV === "DEV"
        ? process.env.CHARGEBEE_TEST_SITE
        : process.env.CHARGEBEE_LIVE_SITE;
    const apiKey =
      process.env.NODE_ENV === "STAGING" || process.env.NODE_ENV === "DEV"
        ? process.env.CHARGEBEE_TEST_API_KEY
        : process.env.CHARGEBEE_LIVE_API_KEY;
    const headers = {
      Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
    };
    const result = await axios.get(
      `https://${site}.chargebee.com/api/v2/subscriptions/${customer_id}`,
      { headers },
    );

    const subscription = result.data?.subscription;
    if (subscription) {
      const trialEnd = new Date(subscription.trial_end * 1000);
      const today = new Date();
      const daysLeft = Math.ceil((trialEnd - today) / (1000 * 60 * 60 * 24));
      return {
        status: subscription.status,
        trial_end_days: daysLeft,
        trial_end_date: moment(trialEnd).format("lll"),
        subscription: subscription.subscription_items[0],
      };
    }
  } catch (e) {
    console.error("Error retrieving chargebee info", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateCustomerAuth0User = async (user_id, email, name, nickname) => {
  try {
    const auth0 = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT,
      clientSecret: process.env.AUTH0_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: "read:users update:users create:users",
      grantType: "client_credentials",
    });

    let user = await auth0.getUser({
      id: user_id,
    });
    if (!user) {
      return null;
    }

    const keysToExclude = [
      "email_verified",
      "logins_count",
      "last_login",
      "last_ip",
      "user_id",
      "updated_at",
      "identities",
      "created_at",
      "name",
      "email",
      "nickname",
    ];
    const filteredUser = Object.keys(user).reduce((result, key) => {
      if (!keysToExclude.includes(key)) {
        result[key] = user[key];
      }
      return result;
    }, {});

    let data = {
      ...filteredUser,
      email,
      name,
      nickname,
    };
    if (user.email === data.email) delete data.email;

    let result = await auth0.updateUser(
      {
        id: user_id,
      },
      data,
    );

    return {
      user_id: result.user_id,
      email: result.email,
      name: result.name,
      nickname: result.nickname,
    };
  } catch (e) {
    console.error("Error updating Auth0 info", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const updateCustomerAuth0UserImage = async (user_id, url) => {
  try {
    const auth0 = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT,
      clientSecret: process.env.AUTH0_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: "read:users update:users create:users",
      grantType: "client_credentials",
    });

    let user = await auth0.getUser({
      id: user_id,
    });
    if (!user) {
      return null;
    }
    let result = await auth0.updateUser(
      {
        id: user_id,
      },
      { picture: url },
    );
    return {
      user_id: result.user_id,
      picture: result.picture,
      email: result.email,
      name: result.name,
      nickname: result.nickname,
    };
  } catch (e) {
    console.error("Error updating Auth0 image", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

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
