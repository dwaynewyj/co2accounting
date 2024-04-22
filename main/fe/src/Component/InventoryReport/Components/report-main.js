import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const ReportMain = ({ title, component }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{
        width: "100%",
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
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#404040",
          }}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        {component}
      </Grid>
    </Grid>
  );
};

ReportMain.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};

export default ReportMain;
