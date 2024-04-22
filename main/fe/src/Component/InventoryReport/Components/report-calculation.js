import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import StreamIcon from "@mui/icons-material/Stream";

const ReportCalculation = ({ report, setReport }) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1.25,
      }}
    >
      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            report.calculation_method === "centralized" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            calculation_method: "centralized",
            calculation_method_text: "Centralized",
          });
        }}
      >
        <HubIcon
          className="hover-child"
          sx={{
            color:
              report.calculation_method !== "centralized" ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color:
              report.calculation_method !== "centralized" ? "#404040" : "white",
          }}
        >
          Centralized
        </Typography>
      </Grid>
      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            report.calculation_method === "decentralized" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            calculation_method: "decentralized",
            calculation_method_text: "Decentralized",
          });
        }}
      >
        <StreamIcon
          className="hover-child"
          sx={{
            color:
              report.calculation_method !== "decentralized"
                ? "#9A9A9A"
                : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color:
              report.calculation_method !== "decentralized"
                ? "#404040"
                : "white",
          }}
        >
          Decentralized
        </Typography>
      </Grid>
    </Grid>
  );
};

ReportCalculation.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportCalculation;
