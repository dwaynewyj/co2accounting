import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Grid, Fade } from "@mui/material";
import LocationCard from "./location-card.js";

const useStyles = makeStyles((theme) => ({}));
const OverviewLocations = ({ locations, setGlobalLocation }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        // gap: 50,
        width: "100%",
      }}
    >
      {locations.map((location, index) => {
        return (
          location && (
            <Fade key={`fade_location_card_${index}`} in={true} timeout={2000}>
              <Grid
                item
                xs
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={`location_${location._id}_${index}`}
              >
                <LocationCard
                  location={location}
                  setGlobalLocation={setGlobalLocation}
                />
              </Grid>
            </Fade>
          )
        );
      })}
    </Grid>
  );
};

OverviewLocations.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([undefined]),
  ]),
  setGlobalLocation: PropTypes.func.isRequired,
};

export default OverviewLocations;
