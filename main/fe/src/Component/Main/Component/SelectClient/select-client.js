import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/Category";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useAuth0 } from "@auth0/auth0-react";
import SButton from "../Button/sbutton.js";
import { axiosBaseInstance } from "../../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    // height: "500px",
    padding: "40px",
    flexWrap: "nowrap !important",
    gap: 20,
  },
  grid_card_title: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  grid_card_clients: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.start,
    width: "100%",
    padding: "10px",
    maxHeight: "100%",
    overflowY: "scroll",
  },
  grid_card_action: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },

  grid_client_card: {
    width: "100%",
    // border: "2px solid black",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    padding: 10,
    cursor: "pointer",
    "&:hover": {
      background: "#F9F9F9 0% 0% no-repeat padding-box",
    },
  },
  grid_client_container: {
    width: "100%",
  },
  grid_client: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  grid_client_info: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "black",
  },
  grid_client_info_icon: {
    padding: 3,
  },
}));

function SelectClient({ customer }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (customer) {
      fetchClientOrganizations(customer._id);
    }
  }, [customer]);

  const fetchClientOrganizations = (cust_org_id) => {
    const fetchClientOrganizationData = async () => {
      try {
        const response = await axiosBaseInstance.get("/client", {
          params: {
            cust_org_id,
          },
        });
        setClients(response?.data?.clients);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchClientOrganizationData();
  };

  useEffect(() => {
    if (selectedClient) {
    }
  }, [selectedClient]);

  const handleContinue = () => {
    navigate(`/overview`, {
      state: { customer: customer, client: selectedClient },
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_card}
    >
      <Grid item className={classes.grid_card_title}>
        <Typography size="lg" variant="subtitle">
          Select Client
        </Typography>
      </Grid>
      <Grid item className={classes.grid_card_clients}>
        {clients?.length ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"

            // className={classes.grid_card}
          >
            {clients.map((client, index) => {
              return (
                <Grid
                  item
                  xs
                  key={`client_card_${index}`}
                  className={classes.grid_client_card}
                  onClick={() => {
                    setSelectedClient(client);
                  }}
                  style={{
                    background:
                      selectedClient &&
                      client._id === selectedClient._id &&
                      "#F9F9F9 0% 0% no-repeat padding-box",
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_client_container}
                  >
                    <Grid
                      item
                      xs
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography size="lg" variant="title">
                        {client.client_org_data.client_org_name}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          width: "100%",
                        }}
                      >
                        <Grid item className={classes.grid_client}>
                          <ApartmentIcon
                            className={classes.grid_client_info_icon}
                          />

                          <Typography className={classes.grid_client_info}>
                            {client.client_org_data.client_org_industry}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.grid_client}>
                          <CategoryIcon
                            className={classes.grid_client_info_icon}
                          />

                          <Typography className={classes.grid_client_info}>
                            {client.client_org_data.client_org_type}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.grid_client}>
                          <LocalPhoneIcon
                            className={classes.grid_client_info_icon}
                          />

                          <Typography className={classes.grid_client_info}>
                            {client.client_org_data.client_org_phoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Grid>

      <Grid item className={classes.grid_card_action}>
        <SButton onClick={handleContinue} disabled={!selectedClient} />
      </Grid>
    </Grid>
  );
}

SelectClient.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default SelectClient;
