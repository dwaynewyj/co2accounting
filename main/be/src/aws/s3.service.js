const AWS = require("aws-sdk");
// import fetch from "node-fetch";
const fs = require("fs");

const upload = async (file_url, upload_url) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  });
  const contents = fs.createReadStream(file_url);

  const uploadedImage = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: upload_url,
      Body: contents,
      ContentEncoding: "base64",
    })
    .promise();
  return uploadedImage.Location;
};

module.exports = {
  upload,
};
