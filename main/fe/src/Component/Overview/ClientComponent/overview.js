import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OverviewHeader from "./overview-header.js";
import OverviewChips from "./overview-chips.js";
import OverviewClients from "./overview-clients.js";

const useStyles = makeStyles((theme) => ({}));

const ClientOverview = ({ customer, clients, setGlobalClient, setUpdated }) => {
  const classes = useStyles();
  const [clientFilter, setClientFilter] = useState(null);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        // height: "100%",

        padding: "20px",
        flexWrap: "unset",
      }}
    >
      <Grid item xs={2} style={{ width: "100%" }}>
        <OverviewHeader
          customer={customer}
          clients={clients}
          setUpdated={setUpdated}
        />
      </Grid>

      {clients?.length > 0 ? (
        <>
          <Grid item style={{ width: "100%" }}>
            <OverviewChips
              customer={customer}
              clients={clients}
              setClientFilter={setClientFilter}
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
            <OverviewClients
              customer={customer}
              clients={
                clientFilter
                  ? clients.filter((client) => {
                      return (
                        client.client_org_data.client_org_type === clientFilter
                      );
                    })
                  : clients
              }
              setGlobalClient={setGlobalClient}
              setUpdated={setUpdated}
            />
          </Grid>
        </>
      ) : (
        customer && (
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
            {<CircularProgress />}
          </Grid>
        )
      )}
    </Grid>
  );
};

ClientOverview.propTypes = {
  customer: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  setGlobalClient: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default ClientOverview;
