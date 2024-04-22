import React from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";

function ChargebeePortal({ url, open, handleClose }) {
  const { user } = useAuth0();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        sx: {
          background: "transparent",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <iframe
        scrolling="no"
        src={url}
        title="Chargebee Portal"
        style={{
          borderRadius: 10,
          width: 470,
          height: 700,
          zIndex: 999999,
          visibility: "visible",
          position: "relative",
          border: 0,
          display: "block",
        }}
      />
    </Dialog>
  );
}

ChargebeePortal.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ChargebeePortal;
