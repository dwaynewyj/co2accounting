import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const useStyles = makeStyles((theme) => ({}));

const HelpButton = () => {
  const classes = useStyles();
  const { logout } = useAuth0();
  return (
    <Button
      sx={{
        borderRadius: 100,
        border: "none",
        height: "33px",
        minWidth: "200px",
        border: "none",
        background: "transparent",

        ":hover": {
          opacity: 0.8,
          background: "#999E9F",
          color: "white",
        },

        fontSize: "16px !important",
        fontFamily: "montserrat",
        fontWeight: 900,
        color: "#999E9F",
        textWrap: "nowrap",
        textTransform: "none",
      }}
      endIcon={<HelpOutlineIcon />}
      onClick={() => {
        const newWindow = window.open(
          "https://www.climateaccounting.com/help-center/getting-started-with-scop3 ",
          "_blank",
        );
        newWindow.focus();
      }}
    >
      Help
    </Button>
  );
};

export default HelpButton;
