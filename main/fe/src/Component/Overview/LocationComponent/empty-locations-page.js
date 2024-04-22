import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import empty_location_icon from "./assets/empty-location.svg";

import CreateLocationButton from "./SharedComponent/create-location-button.js";

const useStyles = makeStyles((theme) => ({}));

const EmptyLocationsPage = ({ setCreateLocationOpen }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <img
          src={empty_location_icon}
          alt={empty_location_icon}
          style={{ width: 200 }}
        />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#4690CD",
          }}
        >
          Add a New Reporting Location
        </Typography>
      </Grid>

      <Grid
        item
        style={{
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          Establish and designate all the locations under your client’s
          jurisdication here. In order to proceed one location should be present
          for a client.
        </Typography>
      </Grid>

      <Grid
        item
        style={{
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <CreateLocationButton action={() => setCreateLocationOpen(true)} />
      </Grid>

      <Grid
        item
        style={{
          maxWidth: "50%",
          textAlign: "center",
          paddingTop: 100,
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          {`Not sure where to start? Visit our `}
          <a
            style={{
              textDecoration: "underline",
            }}
            onClick={() => {
              const newWindow = window.open(
                "https://www.climateaccounting.com/help-center/getting-started-with-scop3 ",
                "_blank",
              );
              newWindow.focus();
            }}
          >{`Help Center`}</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyLocationsPage;
