const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app_ledgers";

async function getFactorsDecisionsResponse(nextVal, currentVal, query) {
  const db = {};

  //create the names using the right numbers for next and current Decisions
  const options_name = `Decision${nextVal}`;
  const question_name = `Decision${nextVal}_Question`;
  const measure_name = `Decision${currentVal}_Measure`;
  const type_name = `Decision${currentVal}_Type`;
  const allowed_measures_name = `Decision${currentVal}_AllowedMeasures`;
  const Method_name = "Method";
  const MeasureType_name = "MeasureType";
  const Scope_name = "Scope";

  //build the response object, only add the items that are needed
  let ret_obj = {};
  ret_obj[options_name] = await db
    .collection("emissions_factors")
    .distinct(options_name, query);
  ret_obj[question_name] = await db
    .collection("emissions_factors")
    .distinct(question_name, query);

  ret_obj[type_name] = await db
    .collection("emissions_factors")
    .distinct(type_name, query);

  //if there are no decision options for the next decision this means the decision selection is complete for
  //this expense and we need to return the method name to be called
  if (ret_obj[options_name][0] == null) {
    ret_obj[Method_name] = await db
      .collection("emissions_factors")
      .distinct("Method", query);
    ret_obj[MeasureType_name] = await db
      .collection("emissions_factors")
      .distinct("Measure Type", query);
    ret_obj[Scope_name] = await db
      .collection("emissions_factors")
      .distinct("Scope", query);
  }

  //if the current decision is an Input we need to also return all the allowed units
  if (ret_obj[type_name] == "I") {
    ret_obj[measure_name] = await db
      .collection("emissions_factors")
      .distinct(measure_name, query);
    ret_obj[allowed_measures_name] = AllowedMeasures(ret_obj[measure_name][0]);
  }

  return ret_obj;
}

module.exports = {
  getFactorsDecisionsResponse,
};
