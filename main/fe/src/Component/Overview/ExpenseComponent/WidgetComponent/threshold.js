import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BarChart } from "@mui/x-charts";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  grid_item: {
    width: "100%",
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

  label: {
    fontSize: "12px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#A2A2A2",
    paddingLeft: 20,
  },
}));

const Threshold = ({ data }) => {
  const classes = useStyles();

  const xLabels = data.map((item) => item?.category);
  const uData = data.map((item) => item?.sum);
  const pData = data.map((item) => item?.sumLastYear);

  return (
    <div>
      <Grid item className={classes.grid_item_title}>
        <Typography className={classes.sub_title}>
          GHG Emissions (megatones CO2e)
        </Typography>
      </Grid>
      <Grid item className={classes.grid_item_title}>
        <Typography className={classes.title}>
          Year over Year Data / Threshold
        </Typography>
      </Grid>
      <BarChart
        width={1000}
        height={400}
        margin={{ left: 80, right: 80 }}
        series={[
          { data: uData, label: "Reporting Year", id: "reportingYear" },
          { data: pData, label: "Base Year", id: "baseYear" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        colors={["#C4DCF1", "#4887C5"]}
      />
    </div>
  );
};

export default Threshold;
