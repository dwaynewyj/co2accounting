import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import report_client_icon from "../assets/report-client.svg";

const ReportClient = ({ report, setReport, clients }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    report.client
      ? clients.findIndex((client) => client?._id === report.client?._id)
      : -1,
  );

  useEffect(() => {}, [selectedIndex]);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1.25,
      }}
    >
      {clients.map((client, index) => {
        return (
          <Grid
            item
            xs
            variant="inv-report-card"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              background:
                index === selectedIndex &&
                "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
            }}
            onClick={() => {
              setSelectedIndex(index);
              setReport({ ...report, client: client });
            }}
          >
            <img src={report_client_icon} alt={report_client_icon} />
            <Typography
              className="hover-child"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                color: index !== selectedIndex ? "#4699CF" : "white",
              }}
            >
              {client.client_org_data.client_org_name}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

ReportClient.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
};

export default ReportClient;
