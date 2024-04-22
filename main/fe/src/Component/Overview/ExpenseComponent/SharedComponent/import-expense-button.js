import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UploadIcon from "@mui/icons-material/Upload";

const useStyles = makeStyles((theme) => ({}));

const ImportExpenseButton = ({ primary, action }) => {
  const classes = useStyles();

  return (
    <Button
      variant={primary ? "none" : "secondary"}
      size="md"
      endIcon={<UploadIcon />}
      onClick={action}
    >
      Import Expense
    </Button>
  );
};

ImportExpenseButton.propTypes = {
  action: PropTypes.func.isRequired,
};

export default ImportExpenseButton;
