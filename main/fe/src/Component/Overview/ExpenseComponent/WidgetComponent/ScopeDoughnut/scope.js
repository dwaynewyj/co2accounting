import React from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Grid, Fade, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useScope from "./hooks/useScope";
import { SCOPE_COLORS } from "./util/constants";

ChartJS.register(ArcElement, Tooltip, Legend);
const Scope = ({ scopeRank }) => {
  const { activeScopeValue, activeScopeColor, onLegendClick } =
    useScope(scopeRank);

  const data = {
    labels: scopeRank.map((item) => {
      return `Scope ${item.scope}`;
    }),
    datasets: [
      {
        label: "Total Emitted",
        data: scopeRank.map((item) => {
          return item.sum;
        }),
        backgroundColor: SCOPE_COLORS,
        borderColor: ["white", "white", "white"],
        borderWidth: 1,

        borderJoinStyle: "miter",
      },
    ],
    text: "23%",
  };

  const options = {
    aspectRatio: 1,

    responsive: true,
    maintainAspectRatio: true,
    radius: "80%",
    cutout: "80%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        onClick: onLegendClick,
        display: true,
        position: "top",
        labels: {
          color: "#AFAFAF",
          padding: 50,
          usePointStyle: true,
          boxHeight: 15,
          boxWidth: 15,
          font: {
            size: 12,
            family: "Montserrat",
            weight: 900,
          },
        },
      },
      displayTextPlugin: {
        scopeValue: activeScopeValue,
        scopeColor: activeScopeColor,
      },
    },
  };

  const displayTextPlugin = {
    id: "displayTextPlugin",
    afterDraw: function (chart, args, options) {
      const ctx = chart.ctx;

      ctx.font = "bold 40px Montserrat";
      ctx.fillStyle = options.scopeColor;
      ctx.textAlign = "Center";
      ctx.textBaseline = "middle";

      const displayValue =
        options.scopeValue === 0 ? 0 : (options.scopeValue / 1000).toFixed(2);
      let stringLength = displayValue.toString().length;

      ctx.fillText(
        `${displayValue}`,
        chart.getDatasetMeta(0).data[0].x - stringLength * 10,
        chart.getDatasetMeta(0).data[0].y,
      );
      ctx.font = "16px Montserrat";
      ctx.fillStyle = "#999E9F";
      ctx.textAlign = "Center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `tCO2e`,
        chart.getDatasetMeta(0).data[0].x - 20,
        chart.getDatasetMeta(0).data[0].y + 50,
      );
    },
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            size="md"
            sx={{
              fontWeight: 900,
              color: "#A2A2A2",
              paddingLeft: "20px",
            }}
          >
            Emitted to Date
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 900,
              color: "#467EC7",
              padding: "20px",
            }}
          >
            Total Emissions
          </Typography>
        </Grid>
      </Grid>

      <Fade in={true} timeout={500}>
        <Grid item className="centered" sx={{ width: "100%" }}>
          <Doughnut
            options={options}
            data={data}
            plugins={[displayTextPlugin]}
            sx={{ padding: "20px" }}
          />
        </Grid>
      </Fade>
    </Grid>
  );
};

Scope.propTypes = {
  scopeRank: PropTypes.array.isRequired,
};

export default Scope;
