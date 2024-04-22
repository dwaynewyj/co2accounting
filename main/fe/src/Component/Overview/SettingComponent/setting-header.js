import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  grid_header: {
    width: "100%",
    height: "100%",
  },
  grid_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  },
}));

const SettingHeader = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_header}
    >
      <Grid item xs className={classes.grid_title}>
        <Typography variant="title" size="lg">
          Admin{" "}
          <Typography variant="title-secondary" size="lg">
            Settings
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SettingHeader;
