import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import scope_3_icon from "../assets/scope-3.svg";
import scope_2_icon from "../assets/scope-2.svg";
import scope_1_icon from "../assets/scope-1.svg";
import report_supplier_icon from "../assets/report-supplier.svg";

const ReportInclude = ({ report, setReport }) => {
  const [options, setOptions] = useState({});

  const scope_breakdown = "Scope Breakdown";
  const scope_3 = "Scope 3";
  const scope_2 = "Scope 2";
  const scope_1 = "Scope 1";
  const supplier_breakdown = "Supplier Breakdown";

  const addToOptions = (item) => {
    options[item] = true;
    setOptions({ ...options });
  };

  const removeFromOptions = (item) => {
    options[item] = false;
    setOptions({ ...options });
  };

  useEffect(() => {
    let validOptions = Object.keys(options).filter((key) => options[key]);
    if (validOptions.length > 0) {
      setReport({ ...report, options: options, generate: true });
    } else {
      setReport({ ...report, options: options });
    }
  }, [options, setOptions]);

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
        alignItems: "stretch",
        gap: 1.25,
      }}
    >
      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            options[scope_breakdown] &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          if (options[scope_breakdown]) {
            removeFromOptions(scope_breakdown);
          } else {
            addToOptions(scope_breakdown);
          }
        }}
      >
        <DonutLargeIcon
          className="hover-child"
          sx={{
            color: !options[scope_breakdown] ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color: !options[scope_breakdown] ? "#404040" : "white",
          }}
        >
          {scope_breakdown}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            options[scope_3] &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          if (options[scope_3]) {
            removeFromOptions(scope_3);
          } else {
            addToOptions(scope_3);
          }
        }}
      >
        <img
          src={scope_3_icon}
          alt={scope_3_icon}
          className="hover-child"
          sx={{
            color: !options[scope_3] ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color: !options[scope_3] ? "#404040" : "white",
          }}
        >
          {scope_3}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            options[scope_2] &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          if (options[scope_2]) {
            removeFromOptions(scope_2);
          } else {
            addToOptions(scope_2);
          }
        }}
      >
        <img
          src={scope_2_icon}
          alt={scope_2_icon}
          className="hover-child"
          sx={{
            color: !options[scope_2] ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: !options[scope_2] ? "#404040" : "white",
          }}
        >
          {"Scope 2"}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            options[scope_1] &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          if (options[scope_1]) {
            removeFromOptions(scope_1);
          } else {
            addToOptions(scope_1);
          }
        }}
      >
        <img
          src={scope_1_icon}
          alt={scope_1_icon}
          className="hover-child"
          sx={{
            color: !options[scope_1] ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: !options[scope_1] ? "#404040" : "white",
          }}
        >
          {scope_1}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            options[supplier_breakdown] &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          if (options[supplier_breakdown]) {
            removeFromOptions(supplier_breakdown);
          } else {
            addToOptions(supplier_breakdown);
          }
        }}
      >
        <img
          src={report_supplier_icon}
          alt={report_supplier_icon}
          className="hover-child"
          sx={{
            color: !options[supplier_breakdown] ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: !options[supplier_breakdown] ? "#404040" : "white",
          }}
        >
          {supplier_breakdown}
        </Typography>
      </Grid>
    </Grid>
  );
};

ReportInclude.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportInclude;
