const errorCode = require("../../constant/errorCode.js");
const errorMessage = require("../../constant/errorMessage.js");
const { PythonShell } = require("python-shell");
const { MongoClient } = require("mongodb");
const {
  getTopEmittingSuppliers,
  calculateEmissions,
  calculateEmissionsByScopeAndSector,
} = require("./util");

const MONGODB_URI = process.env.MONGODB_CLIENT_SRV;
const MONGODB = "sc_app_ledgers";
const PYSHELL_CONFIG = {
  mode: "binary",
  pythonOptions: ["-u"],
  pythonPath: "./.venv/bin/python3",
  scriptPath: "./src/service/report.service/scripts",
};

const generateReport = async (client_loc_id, year) => {
  let pdfBuffer = [];

  const pythonShell = new PythonShell("summary-report.py", {
    ...PYSHELL_CONFIG,
    args: [process.env.MONGODB_CLIENT_SRV, client_loc_id, year],
  });

  pythonShell.stdout.on("data", (data) => {
    pdfBuffer.push(data);
  });

  const executionPromise = new Promise((resolve, reject) => {
    pythonShell.end((err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(Buffer.concat(pdfBuffer));
    });
  });

  return await executionPromise;
};

const generateInventoryReport = async (data) => {
  // data fetching and cleaning
  const client = await MongoClient.connect(MONGODB_URI, {
    useUnifiedTopology: true,
  });
  const db = client.db(MONGODB);
  const collection = db.collection(
    `${data.client_loc_id}_${data.reporting_year}`,
  );

  const expenses = await collection
    .find({ ghg_data: { $exists: true, $ne: {} } })
    .sort({ amount: 1 })
    .toArray();

  const total_emissions = calculateEmissions(expenses);
  data.total_emissions = total_emissions;

  const suppliers = getTopEmittingSuppliers(
    expenses,
    total_emissions.total_CO2e_kg,
  );
  data.suppliers = suppliers;

  const breakdown = calculateEmissionsByScopeAndSector(expenses);
  data.breakdown = breakdown;

  // python script
  let pdfBuffer = [];

  const pythonShell = new PythonShell("inventory-report.py", {
    ...PYSHELL_CONFIG,
    args: [JSON.stringify(data)],
  });

  pythonShell.stdout.on("data", (data) => {
    pdfBuffer.push(data);
  });

  const executionPromise = new Promise((resolve, reject) => {
    pythonShell.end((err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(Buffer.concat(pdfBuffer));
    });
  });

  return await executionPromise;
};

const getReport = async (
  user_id,
  client_loc_id,
  qty_records,
  page_num,
  year,
) => {};

module.exports = {
  generateReport,
  generateInventoryReport,
  getReport,
};
