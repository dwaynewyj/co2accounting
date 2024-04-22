const axios = require("axios");
const chargebee = require("chargebee");
const { _PRODUCTION } = require("../constant/config");
const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app";

chargebee.configure({
  site: _PRODUCTION
    ? process.env.CHARGEBEE_LIVE_SITE
    : process.env.CHARGEBEE_TEST_SITE,
  api_key: _PRODUCTION
    ? process.env.CHARGEBEE_LIVE_API_KEY
    : process.env.CHARGEBEE_TEST_API_KEY,
});

//==============================================================================
// DESCRIPTION: Generate Chargebee hosted page portal URL
// ROUTE: GET http://localhost:8000/api/chargebee/portal
// PRE-CONDITION:
//    @query  subscription_id
//    @query  key
// POST-CONDITION:
//    Returns {url}
const chargebeePortal = async (req, res) => {
  const { subscription_id, portal } = req.query;

  try {
    // Fetch subscription details from Chargebee API
    const subscription = await chargebee.subscription
      .retrieve(subscription_id)
      .request();

    const chargebeePortal = await chargebee.portal_session
      .create({
        id: subscription.customer.id,
        customer: {
          id: subscription.customer.id,
        },
      })
      .request();

    let url = `${chargebeePortal.portal_session.access_url}&forward=portal_edit_billing_address&hp_opener=chargebee&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    if (portal === "edit") {
      url = `${chargebeePortal.portal_session.access_url}&forward=sub_details&fw%5BsubscriptionId%5D=${subscription.subscription.id}&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    }
    if (portal === "payment") {
      url = `${chargebeePortal.portal_session.access_url}&forward=portal_payment_methods&fw%5BsubscriptionId%5D=${subscription.subscription.id}&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    }
    if (portal === "billing") {
      url = `${chargebeePortal.portal_session.access_url}&forward=portal_billing_history&fw%5BsubscriptionId%5D=${subscription.subscription.id}&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    }
    if (portal === "address") {
      url = `${chargebeePortal.portal_session.access_url}&forward=portal_edit_billing_address&hp_opener=chargebee&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    }
    if (portal === "account") {
      url = `${chargebeePortal.portal_session.access_url}&forward=account_details&fw%5BsubscriptionId%5D=${subscription.subscription.id}&hp_opener=chargebee&hp_referrer=https%3A%2F%2Fwww.chargebee.com&layout=in_app`;
    }

    return res.status(200).json({
      url: url,
    });
  } catch (error) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: error });
  }
};

// DESCRIPTION: Create a subscription in chargebee for the user
// ROUTE: POST http://localhost:8000/api/chargebee/hosted-checkout
// PRE-CONDITION:
//    @body  user_id
//    @body  plan_id
//    @body  email
// POST-CONDITION:
//    Returns {status, message, record}
const createHostedCheckout = async (req, res) => {
  const { user_id, plan_id, email } = req.body;

  try {
    const mclient = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = mclient.db(MONGODB);

    const collection = db.collection("cust_orgs");
    const cust_org = await collection.findOne({ user_ids: user_id });

    if (!cust_org)
      return res.status(errorCode.NOT_FOUND).json({
        status: "NOT FOUND",
        message: errorMessage.ERROR_CUST_ORG_NOT_FOUND,
        record: { user_id, plan_id },
      });

    const { hosted_page } = await chargebee.hosted_page
      .checkout_new_for_items({
        subscription_items: [{ item_price_id: plan_id }],
        customer: { email: email },
      })
      .request();

    return res.status(errorCode.SUCCESS).json({
      status: "SUCCESS",
      message: "hosted checkout page created",
      record: { user_id, plan_id, email, hosted_page },
    });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({
      status: "ERROR",
      message: err.message,
      record: { user_id, plan_id, email },
    });
  }
};

// DESCRIPTION: Update a subscription in chargebee for the user
// ROUTE: PUT http://localhost:8000/api/chargebee/hosted-checkout
// PRE-CONDITION:
//    @body  user_id
//    @body  plan_id
// POST-CONDITION:
//    Returns {status, message, record}
const updateHostedCheckout = async (req, res) => {
  const { user_id, plan_id } = req.body;

  try {
    const mclient = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = mclient.db(MONGODB);

    const collection = db.collection("cust_orgs");
    const cust_org = await collection.findOne({ user_ids: user_id });

    if (!cust_org)
      return res.status(errorCode.NOT_FOUND).json({
        status: "NOT FOUND",
        message: errorMessage.ERROR_CUST_ORG_NOT_FOUND,
        record: { user_id, plan_id },
      });

    const cust_org_id = cust_org.cust_org_id;
    const subscription_id = cust_org.subscription_id;

    const { hosted_page } = await chargebee.hosted_page
      .checkout_existing_for_items({
        replace_items_list: true,
        subscription: { id: subscription_id },
        subscription_items: [{ item_price_id: plan_id }],
      })
      .request();

    return res.status(errorCode.SUCCESS).json(
      Object.assign({
        status: "SUCCESS",
        message: "hosted checkout page updated",
        record: { user_id, plan_id, subscription_id, cust_org_id, hosted_page },
      }),
    );
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({
      status: "ERROR",
      message: err.message,
      record: { user_id, plan_id },
    });
  }
};

// DESCRIPTION: Get checkout info from chargebee
// ROUTE: GET http://localhost:8000/api/chargebee/checkout-info
// PRE-CONDITION:
//    @body  user_id
//    @body  hosted_page_id
// POST-CONDITION:
//    Returns {status, message, record}
const getCheckoutInfo = async (req, res) => {
  const { user_id, hosted_page_id } = req.query;

  try {
    let response = await chargebee.hosted_page
      .retrieve(hosted_page_id)
      .request();

    const subscription_id = await response.hosted_page.content.subscription.id;
    const customer_id =
      await response.hosted_page.content.subscription.customer_id;
    const item_price_id =
      await response.hosted_page.content.subscription.subscription_items[0]
        .item_price_id;

    return res.status(errorCode.SUCCESS).json({
      status: "SUCCESS",
      message: "Checkout information retrieved",
      record: {
        user_id,
        hosted_page_id,
        subscription_id,
        customer_id,
        item_price_id,
      },
    });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({
      status: "ERROR",
      message: err.message,
      record: { user_id, hosted_page_id },
    });
  }
};

// DESCRIPTION: Get plans from chargebee
// ROUTE: GET http://localhost:8000/api/chargebee/plans
// PRE-CONDITION:
// POST-CONDITION:
//    Returns {status, message, record}
const getPlans = async (req, res) => {
  try {
    const plans = [];

    for await (let { item: plan } of (
      await chargebee.item
        .list({
          limit: 6,
          "item_family_id[is]": "SCOP3",
          "type[is]": "plan",
          "status[is]": "active",
        })
        .request()
    ).list) {
      const { price, id: item_price_id } = (
        await chargebee.item_price.list({ "item_id[is]": plan.id }).request()
      ).list[0].item_price;

      plans.push({
        ...plan,
        price,
        item_price_id,
      });
    }

    plans.sort((a, b) => a.price - b.price);

    console.log(plans);

    return res.status(errorCode.SUCCESS).json({
      status: "SUCCESS",
      message: "Plans retrieved successfully",
      record: plans,
    });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({
      status: "ERROR",
      message: err.message,
    });
  }
};
//==============================================================================

module.exports = {
  chargebeePortal,
  createHostedCheckout,
  updateHostedCheckout,
  getCheckoutInfo,
  getPlans,
};
