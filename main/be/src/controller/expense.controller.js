const errorCode = require("../constant/errorCode");
const expenseService = require("../service/expense.service");
const metaService = require("../service/meta.service");
const axios = require("axios");
//==============================================================================
// DESCRIPTION: Create single expense
// ROUTE: GET http://localhost:8000/expense/single
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
//    @query  date
//    @query  payee
//    @query  gl
//    @query  amount
// POST-CONDITION:
//    Returns {expense}
const createSingleExpense = async (req, res) => {
  const { client_loc_id, year, user_id, date, gl, payee, amount } = req.body;

  try {
    const url =
      `${process.env.REACT_APP_ROOT_URL}` +
      (process.env.NODE_ENV === "PRODUCTION"
        ? `/production-sc2-crud-single-expense`
        : `/staging-sc2-crud-single-expense`);

    const payload = {
      user_id: user_id,
      client_loc_id: client_loc_id,
      ledger_year: year,
      expense_data: {
        manual: true,
        date: date,
        gl: gl,
        amount: amount,
        payee: payee,
      },
    };
    const response = await axios.post(`${url}`, payload);
    const expense = await expenseService.getExpenseById(
      client_loc_id,
      year,
      response?.data?.record?.insertedId,
    );
    return res.status(errorCode.SUCCESS).json({
      expense: expense,
    });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy expenses by locaiton ID
// ROUTE: GET http://localhost:8000/expense/
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
// POST-CONDITION:
//    Returns [expense]
const getExpenseByLocationId = async (req, res) => {
  const { client_loc_id, year } = req.query;
  try {
    let expenses = await expenseService.getExpenseByLocationId(
      client_loc_id,
      year,
    );
    return res.status(errorCode.SUCCESS).json({ expenses: expenses });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Create expense metaData
// ROUTE: Post http://localhost:8000/expense/meta
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
//    @query  payee
//    @query  gl
// POST-CONDITION:
//    Returns {expense}
const createExpenseMeta = async (req, res) => {
  const { client_loc_id, year } = req.body;

  try {
    if (client_loc_id || year) {
      let result = await metaService.createExpenseMeta(client_loc_id, year);

      return res.status(errorCode.SUCCESS).json({ expenseMeta: result });
    } else {
      return res
        .status(errorCode.ERROR_INTERNAL_SERVER)
        .json("No client location id or year");
    }
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy expenses by locaiton ID
// ROUTE: GET http://localhost:8000/expense/meta
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
// POST-CONDITION:
//    Returns [import_status]
const getExpenseMeta = async (req, res) => {
  const { client_loc_id, year } = req.query;

  try {
    let result = await metaService.getExpenseMeta(client_loc_id, year);

    if (result?.import_status === 0 || result?.import_status === 1) {
      return res.status(errorCode.SUCCESS).json({ result: result });
    }
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};

//==============================================================================

//==============================================================================
// DESCRIPTION: Update legacy expenses by locaiton ID
// ROUTE: Update http://localhost:8000/expense/meta
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
// POST-CONDITION:
//    Returns [import_status]
const updateExpenseMeta = async (req, res) => {
  const { client_loc_id, year, last_expense_id, import_status } = req.body;

  try {
    let result = await metaService.updateExpenseMeta(
      client_loc_id,
      year,
      last_expense_id,
      import_status,
    );
    if (result) {
      return res.status(errorCode.SUCCESS).json({ expenseMeta: result });
    }
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Archive legacy expenses by expense ID
// ROUTE: PUT http://localhost:8000/expense/archive
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
//    @query  id
//    @query  archive
// POST-CONDITION:
//    Returns [expense]
const archiveExpenseById = async (req, res) => {
  const { archive } = req.body;
  const { client_loc_id, year, id } = req.query;
  try {
    let expense = await expenseService.archiveExpenseById(
      client_loc_id,
      year,
      id,
      archive,
    );
    return res.status(errorCode.SUCCESS).json({ expense: expense });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get Customer Scope
// ROUTE: GET http://localhost:8000/expense/dashboard/scope
// PRE-CONDITION:
//    @query  ledger_name
//    @query  page_num
// POST-CONDITION:
//    Returns [scope]
const getCustomerScope = async (req, res) => {
  const { ledger_name, page_num } = req.query;

  try {
    let scope = await expenseService.getCustomerScope(ledger_name, page_num);
    return res.status(errorCode.SUCCESS).json({ scope: scope });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get Customer GHG
// ROUTE: GET http://localhost:8000/expense/dashboard/ghg
// PRE-CONDITION:
//    @query  ledger_name
//    @query  page_num
// POST-CONDITION:
//    Returns [ghg]
const getCustomerGhg = async (req, res) => {
  const { ledger_name, page_num } = req.query;

  try {
    let ghg = await expenseService.getCustomerGhg(ledger_name, page_num);
    return res.status(errorCode.SUCCESS).json({ ghg: ghg });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get Customer assurance
// ROUTE: GET http://localhost:8000/expense/dashboard/assurance
// PRE-CONDITION:
//    @query  ledger_name
//    @query  page_num
// POST-CONDITION:
//    Returns [assurance]
const getCustomerAssurance = async (req, res) => {
  const { ledger_name, page_num } = req.query;

  try {
    let assurance = await expenseService.getCustomerAssurance(
      ledger_name,
      page_num,
    );
    return res.status(errorCode.SUCCESS).json({ assurance: assurance });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get Customer threshold data
// ROUTE: GET http://localhost:8000/expense/dashboard/threshold
// PRE-CONDITION:
//    @query  ledger_name
//    @query  page_num
// POST-CONDITION:
//    Returns [threshold]
const getCustomerThreshold = async (req, res) => {
  const { ledger_name, page_num } = req.query;

  try {
    let threshold = await expenseService.getCustomerThreshold(
      ledger_name,
      page_num,
    );

    return res.status(errorCode.SUCCESS).json({ threshold: threshold });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

module.exports = {
  createSingleExpense,
  getExpenseByLocationId,
  archiveExpenseById,
  createExpenseMeta,
  getExpenseMeta,
  updateExpenseMeta,
  getCustomerScope,
  getCustomerGhg,
  getCustomerAssurance,
  getCustomerThreshold,
};
