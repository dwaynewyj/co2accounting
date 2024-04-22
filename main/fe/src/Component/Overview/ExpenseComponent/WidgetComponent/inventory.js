import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid, Typography, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",

    background: "white",
    boxShadow: "0px 21px 99px #00000014",
    borderRadius: 20,
    padding: "20px",
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
  grid_inventory: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  grid_inventory_item: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "20px",
    borderRadius: "15px 15px 0 0",
  },

  grid_info: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: 30,
  },
  info: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    borderRadius: "15px 15px 0 0",
  },
  inventory: {
    fontSize: 34,
    fontWeight: 700,
    background: "linear-gradient(to right, #4699cf 0%, #4673c4 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  ytd: {
    fontSize: 14,
    fontWeight: 600,
    color: "#A2A2A2",
    backgroundColor: "transparent",
  },
  grid_percentage: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "15px 15px 0 0",
  },
  grid_chart: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  chart: {
    width: 300,
    height: 300,
  },
}));

const Inventory = ({
  dashboard,
  year,
  cO2ePercentage,
  inventoryData,
  maxInventoryIndex,
}) => {
  const classes = useStyles();

  const labels = [
    parseInt(year, 10) - 2,
    parseInt(year, 10) - 1,
    parseInt(year, 10),
  ];

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        grid: {
          display: false, // Hide the x-axis grid lines
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "",
      },
    },
    layout: {
      margin: {
        left: 100,
        right: 100,
      },
    },
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.grid_root}
    >
      <Grid item className={classes.grid_item_title}>
        <Typography className={classes.title}>YoY GHG Inventory</Typography>
      </Grid>
      <Grid item className={classes.grid_item}>
        <Grid
          container
          spacing={0}
          direction="row"
          className={classes.grid_inventory}
        >
          <Grid item className={classes.grid_inventory_item}>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.grid_info}
            >
              <Grid item className={classes.info}>
                <Typography className={classes.ytd}>YTD</Typography>
              </Grid>

              <Grid item className={classes.info}>
                <Typography className={classes.inventory}>
                  {dashboard[year]
                    ? `${(dashboard[year].inventory / 1000).toFixed(0)}t CO`
                    : `0t CO`}
                  <span style={{ fontSize: 14 }}>2e</span>
                </Typography>
              </Grid>

              {dashboard && (
                <Grid item className={classes.grid_percentage}>
                  {cO2ePercentage > 0 ? (
                    <ArrowUpwardIcon
                      style={{
                        height: "100%",
                        marginRight: 10,
                        color: "#30DC3D",
                        fontSize: 20,
                      }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      style={{
                        height: "100%",
                        marginRight: 10,
                        color: "#DC3D30",
                        fontSize: 20,
                      }}
                    />
                  )}
                  <Typography
                    key={`cO2ePercentage_${cO2ePercentage}`}
                    style={{
                      background:
                        cO2ePercentage > 0
                          ? `linear-gradient(to right, #30DC3D 0%, #19B425 100%)`
                          : `linear-gradient(to right, #DC3D30 0%, #BC3428 100%)`,
                      "-webkit-text-fill-color": "transparent",
                      "-webkit-background-clip": "text",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {`${cO2ePercentage}%`}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item className={classes.grid_chart}>
            <Fade in={true} timeout={1000}>
              {dashboard && (
                <Bar
                  className={classes.chart}
                  options={options}
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "GHG Inventory",
                        data: inventoryData,
                        borderWidth: 0,
                        fill: "start",
                        borderRadius: 15,
                        backgroundColor: (context) => {
                          const ctx = context.chart.ctx;
                          let gradientStart = 0;
                          let gradientEnd = 1;
                          if (context.raw < 0) {
                            gradientStart = 1;
                            gradientEnd = 0;
                          }

                          let alphaStart = 1;
                          let alphaEnd = 0;
                          if (context.raw > 0) {
                            gradientStart = 0;
                            gradientEnd = 1;
                          }
                          //==========================================================
                          // Bar Max (Blue)
                          //==========================================================
                          if (context.dataIndex === maxInventoryIndex) {
                            const gradient = ctx.createLinearGradient(
                              0,
                              0,
                              0,
                              400,
                            );
                            gradient.addColorStop(
                              gradientStart,
                              `rgba(70, 153, 207, ${alphaStart})`,
                            );
                            gradient.addColorStop(
                              gradientEnd,
                              `rgba(70, 115, 196, ${alphaEnd})`,
                            );
                            return gradient;
                          }
                          //==========================================================
                          // Bar Other (Grey)
                          //==========================================================

                          return "grey";
                        },
                      },
                    ],
                  }}
                />
              )}
            </Fade>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Inventory.propTypes = {
  dashboard: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cO2ePercentage: PropTypes.number.isRequired,
  inventoryData: PropTypes.object.isRequired,
  maxInventoryIndex: PropTypes.number.isRequired,
};

export default Inventory;
