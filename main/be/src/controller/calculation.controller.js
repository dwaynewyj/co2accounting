const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const calcService = require("../service/calculation.service");

const getFactorsDecisions = async (req, res) => {
  const {
    Decision1,
    Decision2,
    Decision3,
    Decision4,
    Decision5,
    Decision6,
    Decision7,
  } = req.body;

  //build a generic query with all decisions
  let query = {
    Decision1: Decision1,
    Decision2: Decision2,
    Decision3: Decision3,
    Decision4: Decision4,
    Decision5: Decision5,
    Decision6: Decision6,
    Decision7: Decision7,
  };

  //remove any key pairs that are blank (because they were not sent in the request)
  //this is just easier than building upwards
  for (let index = 1; index <= 7; index++) {
    let name = "Decision" + index;
    if (!query[name]) {
      delete query[name];
    }
  }
  console.log(query);

  let response = {};

  //process from highest to lowest because anything higher than the current
  //requested Decision will be null so it will skip
  if (Decision7) {
    response.record = await calcService.getFactorsDecisionsResponse(
      7,
      7,
      query,
    );
  } else if (Decision6) {
    response.record = await await calcService.getFactorsDecisionsResponse(
      7,
      6,
      query,
    );
  } else if (Decision5) {
    response.record = await calcService.getFactorsDecisionsResponse(
      6,
      5,
      query,
    );
  } else if (Decision4) {
    response.record = await calcService.getFactorsDecisionsResponse(
      5,
      4,
      query,
    );
  } else if (Decision3) {
    response.record = await calcService.getFactorsDecisionsResponse(
      4,
      3,
      query,
    );
  } else if (Decision2) {
    response.record = await calcService.getFactorsDecisionsResponse(
      3,
      2,
      query,
    );
  } else if (Decision1) {
    response.record = await calcService.getFactorsDecisionsResponse(
      2,
      1,
      query,
    );
  } else {
    // let Decision1 = await db
    //   .collection("emissions_factors")
    //   .distinct("Decision1");
    // response.record = {
    //   Decision1,
    // };
  }
  response.status = "SUCCESS";
  response.message = "Decisions successfully retrieved";
};

module.exports = {
  getFactorsDecisions,
};
