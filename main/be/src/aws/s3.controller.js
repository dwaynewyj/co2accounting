const errorCode = require("../constant/errorCode");
const errorMessage = require("../constant/errorMessage");
const s3 = require("./s3.service");

//==============================================================================
// DESCRIPTION: Upload local image to S3
// ROUTE: POST http://localhost:8000/s3/image
// PRE-CONDITION:
//    @header Basic Admin Auth
//    @body file_url     String
//    @body upload_url     String
// POST-CONDITION:
//    Returns uploaded s3 image public URL.
const uploadImage = async (req, res) => {
  const { file_url, upload_url } = req.body;
  try {
    let result = await s3.upload(file_url, upload_url);
    if (!result) {
      return res.status(errorCode.NOT_FOUND).json({ image: null });
    }
    return res.status(errorCode.SUCCESS).json({ image: result });
  } catch (err) {
    throw {
      code: errorCode.ERROR_INTERNAL_SERVER,
      message: errorMessage.ERROR_INTERNAL_SERVER,
    };
  }
};
//==============================================================================

module.exports = {
  uploadImage,
};
