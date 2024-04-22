import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({}));
const ContinueButton = ({ onClick, disabled }) => {
  const classes = useStyles();
  const { logout } = useAuth0();
  return (
    <Button
      disabled={disabled}
      size="sm"
      sx={{ fontSize: 16 }}
      endIcon={<KeyboardArrowRightIcon />}
      onClick={onClick}
    >
      CONTINUE
    </Button>
  );
};

ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ContinueButton;
