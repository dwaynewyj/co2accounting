import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PublicIcon from "@mui/icons-material/Public";

const ReportGoal = ({ report, setReport }) => {
  const [goal, setGoal] = useState(report.business_goals);
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
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            goal === "ghg_risk_management" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            business_goals: "ghg_risk_management",
            business_goals_text: "GHG Risk Management",
          });
          setGoal("ghg_risk_management");
        }}
      >
        <SecurityIcon
          className="hover-child"
          sx={{
            color: goal !== "ghg_risk_management" ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color: goal !== "ghg_risk_management" ? "#404040" : "white",
          }}
        >
          {"GHG Risk Management"}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            goal === "voluntary_participation" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            business_goals: "voluntary_participation",
            business_goals_text: "Voluntary Participation",
          });
          setGoal("voluntary_participation");
        }}
      >
        <AccountBalanceIcon
          className="hover-child"
          sx={{
            color: goal !== "voluntary_participation" ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color: goal !== "voluntary_participation" ? "#404040" : "white",
          }}
        >
          {"Voluntary Participation"}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            goal === "mandatory_compliance" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            business_goals: "mandatory_compliance",
            business_goals_text: "Mandatory Compliance",
          });
          setGoal("mandatory_compliance");
        }}
      >
        <HandshakeIcon
          className="hover-child"
          sx={{
            color: goal !== "mandatory_compliance" ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          className="hover-child"
          size="md"
          sx={{
            fontWeight: 600,
            color: goal !== "mandatory_compliance" ? "#404040" : "white",
          }}
        >
          {"Mandatory Compliance"}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        variant="inv-report-card"
        sx={{
          background:
            goal === "ghg_market_participation" &&
            "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
        }}
        onClick={() => {
          setReport({
            ...report,
            business_goals: "ghg_market_participation",
            business_goals_text: "GHG Market Participation",
          });
          setGoal("ghg_market_participation");
        }}
      >
        <PublicIcon
          className="hover-child"
          sx={{
            color: goal !== "ghg_market_participation" ? "#9A9A9A" : "white",
          }}
        />
        <Typography
          size="md"
          className="hover-child"
          sx={{
            fontWeight: 600,
            color: goal !== "ghg_market_participation" ? "#404040" : "white",
          }}
        >
          {"GHG Market Participation"}
        </Typography>
      </Grid>
    </Grid>
  );
};

ReportGoal.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportGoal;
