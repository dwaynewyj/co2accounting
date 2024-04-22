import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";
import { reset } from "../../Redux/Action/index";
import { store } from "../../Redux/Store/index";

const useStyles = makeStyles((theme) => ({}));

const LogoutButton = () => {
  const classes = useStyles();
  const { logout } = useAuth0();
  return (
    <Button
      sx={{ fontSize: 16 }}
      size="sm"
      onClick={() => {
        store.dispatch(reset());
        logout({ returnTo: window.location.origin });
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
