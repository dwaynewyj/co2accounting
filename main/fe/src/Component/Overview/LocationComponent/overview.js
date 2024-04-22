import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Grid, CircularProgress } from "@mui/material";
import OverviewHeader from "./overview-header.js";
import OverviewChips from "./overview-chips.js";
import OverviewLocations from "./overview-locations.js";
import EmptyLocationsPage from "./empty-locations-page.js";

const useStyles = makeStyles((theme) => ({}));
const Overview = ({
  client,
  locations,
  setGlobalLocation,
  setUpdated,
  isLocationsLoading,
}) => {
  const classes = useStyles();
  const [locationFilter, setLocationFilter] = useState(null);
  const [createLocationOpen, setCreateLocationOpen] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        padding: "20px",
        flexWrap: "unset",
        height: locationFilter?.length <= 0 && "inherit",
      }}
    >
      <Grid item xs={2} style={{ width: "100%" }}>
        <OverviewHeader
          client={client}
          locations={locations}
          setUpdated={setUpdated}
          createLocationOpen={createLocationOpen}
          setCreateLocationOpen={setCreateLocationOpen}
        />
      </Grid>

      {locations && locations.length > 0 ? (
        <>
          <Grid item style={{ width: "100%" }}>
            <OverviewChips
              client={client}
              locations={locations}
              setLocationFilter={setLocationFilter}
            />
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              paddingTop: 50,
              paddingBottom: 50,
            }}
          >
            <OverviewLocations
              locations={
                locationFilter
                  ? locations.filter((location) => {
                      return (
                        location.client_loc_data.client_loc_country ===
                        locationFilter
                      );
                    })
                  : locations
              }
              setGlobalLocation={setGlobalLocation}
            />
          </Grid>
        </>
      ) : (
        client && (
          <Grid
            item
            xs={10}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isLocationsLoading ? (
              <EmptyLocationsPage
                setCreateLocationOpen={setCreateLocationOpen}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};

Overview.propTypes = {
  client: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
  isLocationsLoading: PropTypes.bool.isRequired,
};

export default Overview;
