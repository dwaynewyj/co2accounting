const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const reportService = require("../service/report.service/report.service");
const AWS = require("aws-sdk");
const moment = require("moment");

//==============================================================================
// DESCRIPTION: Generate legacy report by location ID
// ROUTE: GET http://localhost:8000/report/
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
// POST-CONDITION:
//    Returns {status, message}
const generateReport = async (req, res) => {
  const { client_loc_id, client_org_name, year } = req.query;
  const output_name = `GHG_Report_${year}_${client_org_name}_${moment().format(
    "YYYY_MM_DD",
  )}.pdf`;
  const s3_key = `${client_loc_id}/${year}/report/${output_name}`;
  try {
    const pdf = await reportService.generateReport(client_loc_id, year);

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    });
    const uploaded = await s3
      .upload({
        Bucket: process.env.AWS_S3_SUMMARY_REPORT_BUCKET,
        Key: s3_key,
        Body: pdf,
        ContentType: "application/pdf",
        ACL: "public-read",
      })
      .promise();
    res.set("Content-disposition", `attachment; filename=${output_name}`);
    res.set("Content-Type", "application/pdf");
    res.end(pdf);
  } catch (err) {
    console.log(err);
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Generate inventory report
// ROUTE: GET http://localhost:8000/report/inventory
// PRE-CONDITION:
// POST-CONDITION:
//    Returns <report>.pdf
const generateInventoryReport = async (req, res) => {
  const data = req.body;
  const { client_name, client_loc_id, reporting_year } = data;
  const output_name = `Inventory_Report_${reporting_year}_${client_name}_${moment().format(
    "YYYY_MM_DD",
  )}.pdf`;
  const s3_key = `${client_loc_id}/${reporting_year}/report/${output_name}`;
  try {
    const pdf = await reportService.generateInventoryReport(data);

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    });
    const uploaded = await s3
      .upload({
        Bucket: process.env.AWS_S3_INVENTORY_REPORT_BUCKET,
        Key: s3_key,
        Body: pdf,
        ContentType: "application/pdf",
        ACL: "public-read",
      })
      .promise();
    res.set("Content-disposition", `attachment; filename=${output_name}`);
    res.set("Content-Type", "application/pdf");
    res.end(pdf);
  } catch (err) {
    console.log(err);
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get legacy reports by location ID
// ROUTE: GET http://localhost:8000/report/
// PRE-CONDITION:
//    @query  user_id
//    @query  client_loc_id
//    @query  qty_records
//    @query  page_num
// POST-CONDITION:
//    Returns [report]
const getReport = async (req, res) => {
  const { user_id, client_loc_id, qty_records, page_num, year } = req.query;
  try {
    const reports = await reportService.getReport(
      user_id,
      client_loc_id,
      qty_records,
      page_num,
      year,
    );

    return res.status(errorCode.SUCCESS).json({ reports: reports });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};
//==============================================================================

//==============================================================================
// DESCRIPTION: Get all uploaded file history by location ID and year
// ROUTE: GET http://localhost:8000/history/
// PRE-CONDITION:
//    @query  client_loc_id
//    @query  year
// POST-CONDITION:
//    Returns [S3 file]
const getUploadHistory = async (req, res) => {
  const { client_loc_id, year } = req.query;
  try {
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
    const result = data.Contents.filter(
      (file) => !file.Key.includes("report/"),
    ).map((file) => ({
      name: file.Key.replace(`${prefix}`, "").replace("/", ""),
      timestamp: file.LastModified,
      link: `https://${
        process.env.AWS_S3_LOCATION_BUCKET
      }.s3.amazonaws.com/${client_loc_id}/${file.Key.replace(
        `${client_loc_id}/`,
        "",
      )}`,
    }));
    return res.status(errorCode.SUCCESS).json({ history: result });
  } catch (err) {
    return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
  }
};

//==============================================================================

module.exports = {
  generateReport,
  generateInventoryReport,
  getReport,
  getUploadHistory,
};
