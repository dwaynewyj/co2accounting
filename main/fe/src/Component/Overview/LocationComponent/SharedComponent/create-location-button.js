import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({}));

const CreateLocationButton = ({ action }) => {
  const classes = useStyles();

  return (
    <Button endIcon={<AddIcon style={{ fontSize: 20 }} />} onClick={action}>
      Create New Location
    </Button>
  );
};

export default CreateLocationButton;
