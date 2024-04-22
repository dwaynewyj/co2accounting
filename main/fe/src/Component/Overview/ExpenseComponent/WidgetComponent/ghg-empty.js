import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";

import empty_ghg_icon from "./assets/ghg-empty.svg";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap !important",
  },
  grid_item: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
const GhgEmpty = ({}) => {
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
          <Typography className={classes.sub_title}>GHG Breakdown</Typography>
        </Grid>
      </Grid>

      <Grid item className={classes.grid_item}>
        <img
          src={empty_ghg_icon}
          alt={empty_ghg_icon}
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
          // alignItems: "flex-end",
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
            style={{
              textDecoration: "underline",
            }}
            onClick={() => {
              const newWindow = window.open(
                "https://www.climateaccounting.com/help-center/getting-started-with-scop3 ",
                "_blank",
              );
              newWindow.focus();
            }}
          >{`Help Center`}</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GhgEmpty;
