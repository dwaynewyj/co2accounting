import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Grid, Fade } from "@mui/material";
import ClientCard from "./client-card.js";

const useStyles = makeStyles((theme) => ({}));

const OverviewClients = ({ clients, setGlobalClient, setUpdated }) => {
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
      {clients.map((client, index) => {
        return (
          client && (
            <Fade key={`fade_client_card_${index}`} in={true} timeout={2000}>
              <Grid
                item
                xs
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={`clients_${client._id}_${index}`}
              >
                <ClientCard
                  client={client}
                  setGlobalClient={setGlobalClient}
                  setUpdated={setUpdated}
                />
              </Grid>
            </Fade>
          )
        );
      })}
    </Grid>
  );
};

OverviewClients.propTypes = {
  clients: PropTypes.array.isRequired,
  setUpdated: PropTypes.func.isRequired,
  setGlobalClient: PropTypes.func.isRequired,
};

export default OverviewClients;
