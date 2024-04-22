import React from "react";
import PropTypes from "prop-types";
import { Upload } from "antd";
import FileUploadCard from "./Components/file-upload-card";

const { Dragger } = Upload;

const ImportExpense = ({
  location,
  year,
  expense,
  setExpense,
  setIsLoading,
}) => {
  return (
    location && (
      <FileUploadCard
        location={location}
        year={year}
        setExpense={setExpense}
        setIsLoading={setIsLoading}
      />
    )
  );
};

ImportExpense.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setExpense: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default ImportExpense;
