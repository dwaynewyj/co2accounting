import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Tabs, Tab } from "@mui/material";

const ReportHeader = ({ tab, handleTabChange }) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        gap: 1.25,
      }}
    >
      <Grid
        item
        xs
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Typography variant="title" size="lg">
          Generate GHG Report
        </Typography>
      </Grid>
      <Grid
        item
        xs
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Typography size="sm" sx={{ fontWeight: 500 }}>
          {`Detail information for your GHG (Greenhouse Gas) Report`}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Tabs onChange={handleTabChange} value={tab} selectionFollowsFocus>
          <Tab
            label="Account"
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
            }}
          />
          <Tab
            label="Details"
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
            }}
          />
          <Tab
            label="Finalize"
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
            }}
          />
        </Tabs>
      </Grid>
    </Grid>
  );
};

ReportHeader.propTypes = {
  tab: PropTypes.object.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default ReportHeader;
