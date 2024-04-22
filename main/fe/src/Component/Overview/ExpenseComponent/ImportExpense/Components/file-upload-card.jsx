import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useDropzone } from "react-dropzone";
import FileDeleteChip from "./file-delete-chip";
import AWS from "aws-sdk";
import logger from "../../../../../Service/logger";

const useStyles = makeStyles({
  dropzone: {
    borderRadius: 8,
    border: "1px dashed grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    cursor: "pointer",
  },
  grid_item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropzone_text: {
    fontSize: "12px !important",
    fontFamily: "montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },

  file_upload_button: {
    color: "white",
    // backgroundColor: "#4673c4",
    background:
      "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",

    borderRadius: 4,

    fontFamily: "var(--font-primary)",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px !important",

    "&:hover": {
      backgroundColor: "#4673c4",
      color: "white",
      opacity: 0.5,
    },
  },
});

const FileUploadCard = ({ location, year, setExpense, setIsLoading }) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setIsLoading(true);
    setFile(acceptedFiles[0]);
  }, []);

  const uploadCsv = async () => {};

  useEffect(() => {
    const uploadToS3 = async () => {
      const objParams = {
        Bucket: "your-bucket-name",
        Key: "your-object-key",
        Body: "your-object-body",
      };

      try {
        AWS.config.update({
          region: "us-east-1",
          accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        });

        const S3 = new AWS.S3();

        const objParams = {
          Bucket: `${process.env.REACT_APP_LOCATION_BUCKET}/${location._id}`,
          ACL: "public-read",
          Key: `${year}/${file.name}`,
          Body: file,
          ContentType: file.type,
        };

        await S3.putObject(objParams)
          .on("httpUploadProgress", function ({ loaded, total }) {})
          .send(function (err, data) {
            if (err) {
              logger.info(err.code);
              logger.info(err.message);
            } else {
              setExpense(file);
              logger.info(`Uploaded ${file.name}`);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (file && location._id && year) {
      uploadToS3();
    }
  }, [file, setFile]);

  const removeItem = (itemToRemove) => {
    setFile(null);
    setExpense(null);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    open,
  } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={classes.dropzone}
      key={`dropzone_${location._id}`}
    >
      <input {...getInputProps()} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          gap: 10,
        }}
      >
        {!file ? (
          <Grid item className={classes.grid_item}>
            <DriveFolderUploadIcon
              style={{
                fontSize: 80,
                color: "#999E9F",
              }}
            />
          </Grid>
        ) : (
          <Grid
            item
            className={classes.grid_item}
            style={{ width: "100%", zIndex: 1 }}
          >
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: "100%", padding: "20px" }}
            >
              {file && (
                <Grid
                  item
                  className={classes.grid_item}
                  style={{ width: "100%" }}
                  key={`grid_${file.name}`}
                >
                  <FileDeleteChip
                    key={file.name}
                    file={file}
                    onRemove={removeItem}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}

        {!file && (
          <>
            <Grid item className={classes.grid_item}>
              {isDragActive ? (
                <Typography className={classes.dropzone_text}>
                  Drop Files Here
                </Typography>
              ) : (
                <Typography className={classes.dropzone_text}>
                  or drag and drop
                </Typography>
              )}
            </Grid>

            <Grid item className={classes.grid_item}>
              <Button>Upload Expense</Button>
            </Grid>

            <Grid item className={classes.grid_item}>
              <span
                className="fw-normal"
                style={{
                  color: "#999E9F",
                  fontSize: 12,
                  fontFamily: "montserrat",
                  fontWeight: 900,
                }}
              >
                Compatible Format: .csv
              </span>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

FileUploadCard.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setExpense: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default FileUploadCard;
