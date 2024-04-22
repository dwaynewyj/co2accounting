import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import SettingHeader from "./setting-header.js";
import SettingMain from "./setting-main.js";

const useStyles = makeStyles((theme) => ({}));
const Setting = ({ customer }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        padding: "20px",
        flexWrap: "unset",
      }}
    >
      <Grid item xs={2} style={{ width: "100%" }}>
        <SettingHeader customer={customer} />
      </Grid>

      {customer && (
        <Grid
          item
          xs={10}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {<SettingMain customer={customer} />}
        </Grid>
      )}
    </Grid>
  );
};

Setting.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default Setting;
