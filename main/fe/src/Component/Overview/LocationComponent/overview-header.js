import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";
import CreateLocation from "./create-location.js";
import CreateLocationButton from "./SharedComponent/create-location-button.js";

const useStyles = makeStyles((theme) => ({
  grid_header: {
    width: "100%",
    height: "100%",
  },
  grid_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  },
  grid_num_locations: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    gap: 20,
  },
  grid_add_location: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px",
  },
}));

const OverviewHeader = ({
  client,
  locations,
  setUpdated,
  createLocationOpen,
  setCreateLocationOpen,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_header}
    >
      <CreateLocation
        client={client}
        open={createLocationOpen}
        setOpen={setCreateLocationOpen}
        setUpdated={setUpdated}
      />
      <Grid item xs className={classes.grid_title}>
        <Typography variant="title" size="lg">
          {client.client_org_data.client_org_name}
          {"'s "}
          <Typography variant="title-secondary" size="lg">
            Locations
          </Typography>
        </Typography>
      </Grid>
      <Grid
        item
        xs
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid item xs>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs className={classes.grid_num_locations}>
                <Typography size="md" variant="counter">{`${
                  locations?.length ?? 0
                }`}</Typography>
                <Typography variant="subtitle" size="md">
                  Total Locations
                </Typography>
              </Grid>

              <Grid item xs className={classes.grid_add_location}>
                <CreateLocationButton
                  action={() => setCreateLocationOpen(true)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

OverviewHeader.propTypes = {
  client: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  setUpdated: PropTypes.func.isRequired,
  createLocationOpen: PropTypes.bool.isRequired,
  setCreateLocationOpen: PropTypes.func.isRequired,
};

export default OverviewHeader;
