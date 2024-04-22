import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import report_location_icon from "../assets/report-location.svg";

const ReportLocation = ({ report, setReport, locations }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    report.location
      ? locations.findIndex(
          (location) => location?._id === report.location?._id,
        )
      : -1,
  );
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1.25,
      }}
    >
      {locations.length > 0 ? (
        locations.map((location, index) => {
          return (
            <Grid
              item
              xs
              variant="inv-report-card"
              sx={{
                background:
                  index === selectedIndex &&
                  "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
              }}
              onClick={() => {
                setSelectedIndex(index);
                setReport({
                  ...report,
                  location: location,
                });
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1.25,
                }}
              >
                <Grid item xs>
                  <img alt="report-location-icon" src={report_location_icon} />
                </Grid>

                <Grid item xs>
                  <Typography
                    size="md"
                    className="hover-child"
                    sx={{
                      fontWeight: 700,
                      color: index !== selectedIndex ? "#4699CF" : "white",
                    }}
                  >
                    {location.client_loc_data.client_loc_name}
                  </Typography>
                </Grid>

                <Grid item xs>
                  <Typography
                    size="sm"
                    className="hover-child"
                    sx={{
                      fontWeight: 500,
                      textWrap: "nowrap",
                      color: index !== selectedIndex ? "initial" : "white",
                    }}
                  >
                    {location.client_loc_data.client_loc_address}
                  </Typography>
                </Grid>

                <Grid item xs>
                  <Typography
                    size="sm"
                    className="hover-child"
                    sx={{
                      fontWeight: 500,
                      color: index !== selectedIndex ? "initial" : "white",
                    }}
                  >
                    {location.client_loc_data.client_loc_phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid item xs variant="inv-report-card">
          <Typography
            size="sm"
            sx={{
              fontWeight: 500,
            }}
          >
            {"No locations found in this client"}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

ReportLocation.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

export default ReportLocation;
