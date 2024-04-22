import { Grid, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import PropTypes from "prop-types";

import SettingBilling from "./setting-billing.js";
import SettingProfile from "./setting-profile.js";
import SettingQuestion from "./setting-question.js";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
  },
}));
const SettingRight = ({ customer }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  const HorizontalDivider = () => {
    return (
      <Grid item xs style={{ width: "100%", height: "2px" }}>
        <Divider style={{ width: "100%" }} flexItem />
      </Grid>
    );
  };

  return (
    <Grid item xs={8} style={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.grid_root}
      >
        <SettingProfile customer={customer} />
        <HorizontalDivider />
        <SettingBilling customer={customer} />
        <HorizontalDivider />
        <SettingQuestion />
      </Grid>
    </Grid>
  );
};

SettingRight.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default SettingRight;
