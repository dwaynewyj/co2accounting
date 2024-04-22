import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import report_comprehensive_icon from "../assets/report-comprehensive.svg";
import report_quick_icon from "../assets/report-quick.svg";

const ReportType = ({ report, setReport }) => {
  const [quick, setQuick] = useState(null);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
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
            quick &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({ ...report, quick: true, generate: true });
          setQuick(true);
        }}
      >
        <img
          src={report_quick_icon}
          alt={report_quick_icon}
          className="hover-child"
          sx={{
            color: !quick ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: !quick ? "#404040" : "white",
          }}
        >
          {"Quick Report"}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            !quick &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({ ...report, quick: false, generate: false });
          setQuick(false);
        }}
      >
        <img
          src={report_comprehensive_icon}
          alt={report_comprehensive_icon}
          className="hover-child"
          sx={{
            color: quick ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: quick ? "#404040" : "white",
          }}
        >
          {"Comprehensive Report"}
        </Typography>
      </Grid>
    </Grid>
  );
};

ReportType.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportType;
