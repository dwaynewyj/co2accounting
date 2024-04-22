import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import empty_scope_icon from "../assets/scope-empty.svg";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap !important",
  },
  grid_item_chart: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  grid_item_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#467EC7",
    padding: "20px",
  },
  sub_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#A2A2A2",
    paddingLeft: 20,
  },
}));
const ScopeEmpty = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.grid_root}
    >
      <Grid
        item
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Grid item className={classes.grid_item_title}>
          <Typography className={classes.sub_title}>Emitted to Date</Typography>
        </Grid>
        <Grid item className={classes.grid_item_title}>
          <Typography className={classes.title}>Total Emissions</Typography>
        </Grid>
      </Grid>

      <Grid item className={classes.grid_item_chart}>
        <img
          src={empty_scope_icon}
          alt={empty_scope_icon}
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          {`Begin GHG Analysis to see your Scope Breakdown `}
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          {`Not sure where to start?  Visit our `}
          <a
            href="https://www.climateaccounting.com/help-center/getting-started-with-scop3"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Help Center
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ScopeEmpty;
