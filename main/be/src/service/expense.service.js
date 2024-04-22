const errorCode = require("../constant/errorCode.js");
const CATEGORY = require("../constant/category.js");
let mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app_ledgers";

const getExpenseById = async (client_loc_id, year, id) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${client_loc_id}_${year}`);
    const result = await collection.findOne({
      _id: id,
      client_loc_id: client_loc_id,
    });
    await client.close();

    return result;
  } catch (e) {
    console.error("Error retrieving expenses", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getExpenseByLocationId = async (client_loc_id, year) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${client_loc_id}_${year}`);
    const result = await collection
      .find({
        client_loc_id: client_loc_id,
        $and: [
          { "audit_trail.created_at": { $exists: true } },
          { "expense_data.amount": { $exists: true } },
          { "expense_data.amount": { $not: { $eq: 0 } } },
          { "expense_data.amount": { $not: { $type: "undefined" } } },
          { "expense_data.date": { $exists: true } },
          { "expense_data.date": { $ne: "" } },
          { "expense_data.amount": { $ne: "" } },
        ],
      })
      .sort({ "audit_trail.created_at": -1 })
      .toArray();
    await client.close();

    return result;
  } catch (e) {
    console.error("Error retrieving expenses", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const archiveExpenseById = async (client_loc_id, year, id, archive) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${client_loc_id}_${year}`);

    const updateOperation = {
      $set: {
        archive: archive,
      },
    };
    const result = await collection.findOneAndUpdate(
      {
        _id: id,
      },
      updateOperation,
    );

    const expense = await collection.findOne({
      _id: id,
    });

    await client.close();

    return expense;
  } catch (e) {
    console.error("Error updating expense", e);
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: e,
    };
  }
};

const getCustomerScope = async (ledger_name, page_num) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${ledger_name}`);
    const result = await collection
      .find({ "ghg_data.CO2e_kg": { $ne: null } })
      .sort({ AMOUNT: 1 })
      .limit(1000)
      .skip((page_num - 1) * 1000)
      .toArray();

    if (result === null) {
      return { scopeRank: {}, expensesNum: 0 };
    }

    let scopeRank = calculateRankByKey(result, "scope");

    await client.close();

    return { scopeRank: scopeRank, expensesNum: result.length };
  } catch (e) {
    console.error("Error getting customer scopr", e);
  }
  throw {
    code: errorCode.ERROR_INTERNAL_SERVER,
    message: e,
  };
};

const getCustomerGhg = async (ledger_name, page_num) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${ledger_name}`);
    const result = await collection
      .find({ "ghg_data.CO2e_kg": { $ne: null } })
      .sort({ AMOUNT: 1 })
      .limit(1000)
      .skip((page_num - 1) * 1000)
      .toArray();

    if (result === null) {
      return { categoryRank: {}, payeeRank: {} };
    }

    let payeeRank = calculateRankByKey(result, "payee");
    let categoryRank = calculateRankByKey(result, "category");

    await client.close();

    return { categoryRank: categoryRank, payeeRank: payeeRank };
  } catch (e) {
    console.error("Error getting customer scopr", e);
  }
  throw {
    code: errorCode.ERROR_INTERNAL_SERVER,
    message: e,
  };
};

const getCustomerAssurance = async (ledger_name, page_num) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB);
    const collection = db.collection(`${ledger_name}`);
    const result = await collection
      .find({ "ghg_data.CO2e_kg": { $ne: null }, archive: { $ne: true } })
      .sort({ AMOUNT: 1 })
      .limit(1000)
      .skip((page_num - 1) * 1000)
      .toArray();

    if (result === null) {
      return {
        inventory: {},
        confidence: 0,
        completion: 0,
      };
    }

    let inventory = calculateSumByKey(result, "CO2e_kg");
    let confidence_sum = calculateSumByKey(result, "confidence");
    let confidence_average = confidence_sum
      ? confidence_sum /
        result.filter((e) => e.ghg_data && e.ghg_data.confidence).length
      : 0;

    let completion_average =
      result.filter((e) => !e.archive && Object.keys(e.ghg_data).length !== 0)
        .length ?? 1 / e.length;

    let confidence = confidence_average * 100;
    let completion = result.length ? completion_average : 0;

    await client.close();

    return {
      inventory: inventory,
      confidence: confidence,
      completion: completion,
    };
  } catch (e) {
    console.error("Error getting customer scopr", e);
  }
  throw {
    code: errorCode.ERROR_INTERNAL_SERVER,
    message: e,
  };
};

const getCustomerThreshold = async (ledger_name, page_num) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });

    const db = client.db(MONGODB);
    const currentYearCollection = db.collection(ledger_name);
    const lastYearCollection = db.collection(
      getLastYearLedgerName(ledger_name),
    );

    const [currentYearData, lastYearData] = await Promise.all([
      currentYearCollection
        .find({ "ghg_data.CO2e_kg": { $ne: null }, archive: { $ne: true } })
        .sort({ AMOUNT: 1 })
        .limit(1000)
        .skip((page_num - 1) * 1000)
        .toArray(),
      lastYearCollection
        .find({ "ghg_data.CO2e_kg": { $ne: null }, archive: { $ne: true } })
        .toArray(),
    ]);

    const currentYearThreshold = calculateCategorySum(currentYearData);
    const lastYearThreshold = calculateCategorySum(lastYearData);

    const result = [];

    currentYearThreshold.forEach(({ category, sum }) => {
      const lastYearItem = lastYearThreshold.find(
        (item) => item.category === category,
      );
      result.push({
        category,
        sum,
        sumLastYear: lastYearItem ? lastYearItem.sum : 0,
      });
    });

    lastYearThreshold.forEach(({ category, sum }) => {
      if (!result.find((item) => item.category === category)) {
        result.push({
          category,
          sum: 0,
          sumLastYear: sum,
        });
      }
    });

    await client.close();

    return { threshold: result };
  } catch (e) {
    console.error("Error getting customer threshold", e);
  }
  throw {
    code: errorCode.ERROR_INTERNAL_SERVER,
    message: e,
  };
};

const calculateRankByKey = (expenses, key) => {
  return Object.entries(
    expenses.reduce((acc, item) => {
      let dashboardKey = item.expense_data[key];
      if (key === "scope" || key === "category") {
        dashboardKey = item.ghg_data[key];
      }

      const co2e = (item.ghg_data && item.ghg_data.CO2e_kg) ?? 0;

      if (acc[dashboardKey]) {
        acc[dashboardKey] += co2e;
      } else {
        acc[dashboardKey] = co2e;
      }

      return acc;
    }, {}),
  )
    .map(([dashboardKey, sum]) => ({ [key]: dashboardKey, sum }))
    .filter((item) => item.sum !== 0)
    .sort((a, b) => b.sum - a.sum);
};

const calculateSumByKey = (expenses, key) => {
  return expenses
    .map((item) => {
      return (!item.archive && item.ghg_data && item.ghg_data[key]) ?? 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
};

const calculateCategorySum = (expenseArray) => {
  const categorySum = {};

  expenseArray.forEach((expense) => {
    const { ghg_data } = expense;
    const { CO2e_kg, category } = ghg_data;

    const modifiedCategory = CATEGORY[category] || category;

    if (!categorySum[modifiedCategory]) {
      categorySum[modifiedCategory] = CO2e_kg;
    } else {
      categorySum[modifiedCategory] += CO2e_kg;
    }
  });

  const result = Object.entries(categorySum).map(([category, sum]) => ({
    category,
    sum,
  }));

  return result;
};

const getLastYearLedgerName = (currentYearLedget) => {
  return `${currentYearLedget.substring(0, currentYearLedget.length - 4)}${
    parseInt(currentYearLedget.slice(-4)) - 1
  }`;
};

module.exports = {
  getExpenseById,
  getExpenseByLocationId,
  archiveExpenseById,
  getCustomerScope,
  getCustomerGhg,
  getCustomerAssurance,
  getCustomerThreshold,
};
