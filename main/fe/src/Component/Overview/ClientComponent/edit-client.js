import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CallIcon from "@mui/icons-material/Call";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";

const useStyles = makeStyles((theme) => ({
  client_info: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "black",
  },
}));

function EditClient({ edit, setEdited, clientData, setClientData }) {
  const classes = useStyles();

  const handleClientChange = (event, key) => {
    let newClient = { ...clientData };
    if (key === "name") {
      newClient.client_org_data.client_org_name = event.target.value;
    }
    if (key === "industry") {
      newClient.client_org_data.client_org_industry = event.target.value;
    }
    if (key === "phone") {
      newClient.client_org_data.client_org_phoneNumber = event.target.value;
    }
    if (key === "type") {
      newClient.client_org_data.client_org_type = event.target.value;
    }
    setClientData(newClient);
    setEdited(true);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {edit && (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography size="md" sx={{ fontWeight: 900 }}>
                Name:
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextField
                key={`edit_client_name`}
                fullWidth
                value={clientData.client_org_data.client_org_name}
                onChange={(e) => handleClientChange(e, "name")}
              />
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {edit ? (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography size="md" sx={{ fontWeight: 900 }}>
                Phone:
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextField
                key={`edit_client_phone`}
                fullWidth
                value={clientData.client_org_data.client_org_phoneNumber}
                onChange={(e) => handleClientChange(e, "phone")}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <CallIcon
              style={{
                padding: 3,
              }}
            />
            <Typography size="md" sx={{ fontWeight: 900 }}>
              {clientData.client_org_data?.client_org_phoneNumber}
            </Typography>
          </>
        )}
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {edit ? (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography size="md" sx={{ fontWeight: 900 }}>
                Industry:
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextField
                key={`edit_client_industry`}
                fullWidth
                value={clientData.client_org_data.client_org_industry}
                onChange={(e) => handleClientChange(e, "industry")}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <BusinessIcon
              style={{
                padding: 3,
              }}
            />
            <Typography size="md" sx={{ fontWeight: 900 }}>
              {clientData.client_org_data?.client_org_industry}
            </Typography>
          </>
        )}
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {edit ? (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography size="md" sx={{ fontWeight: 900 }}>
                Type:
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextField
                key={`edit_client_type`}
                fullWidth
                value={clientData.client_org_data.client_org_type}
                onChange={(e) => handleClientChange(e, "type")}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <CategoryIcon
              style={{
                padding: 3,
              }}
            />
            <Typography size="md" sx={{ fontWeight: 900 }}>
              {clientData.client_org_data?.client_org_type}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}

EditClient.propTypes = {
  edit: PropTypes.bool.isRequired,
  setEdited: PropTypes.func.isRequired,
  clientData: PropTypes.object.isRequired,
  setClientData: PropTypes.func.isRequired,
};

export default EditClient;
