import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddressGoogle from "../../AddressGoogle/address-google.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
    gap: 5,
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
}));

function ClientCard({ client, setClient }) {
  const classes = useStyles();

  const [clientName, setClientName] = useState("");
  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
    setClient({ ...client, name: event.target.value });
  };

  const [clientIndustry, setClientIndustry] = useState("");
  const handleClientIndustryChange = (event) => {
    setClientIndustry(event.target.value);
    setClient({ ...client, industry: event.target.value });
  };

  const [clientType, setClientType] = useState("");
  const handleClientTypeChange = (event) => {
    setClientType(event.target.value);
    setClient({ ...client, type: event.target.value });
  };

  const [clientPhone, setClientPhone] = useState("");
  const handleClientPhoneChange = (event) => {
    setClientPhone(event.target.value);
    setClient({ ...client, phone: event.target.value });
  };

  const [address, setAddress] = useState({});

  useEffect(() => {
    setClient({ ...client, address: address });
  }, [address, setAddress]);

  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        // boxShadow: "0px 0px 20px 0px #00000019",
      }}
    >
      <CardContent
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_card}
        >
          <Grid item xs={2} className={classes.grid_card_title}>
            <Typography
              style={{
                fontSize: "20px",
                fontFamily: "Montserrat",
                fontWeight: 900,
                color: "#999E9F",
              }}
            >
              Client Setup
            </Typography>
          </Grid>
          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Client Name:</Typography>
            <TextField
              fullWidth
              id="name"
              value={clientName}
              onChange={(e) => handleClientNameChange(e)}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
              inputProps={{
                style: {
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Client Industry:</Typography>
            <TextField
              fullWidth
              id="industry"
              value={clientIndustry}
              onChange={(e) => handleClientIndustryChange(e)}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
              inputProps={{
                style: {
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Client Type:</Typography>
            <TextField
              fullWidth
              id="type"
              value={clientType}
              onChange={(e) => handleClientTypeChange(e)}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
              inputProps={{
                style: {
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Client Phone:</Typography>
            <TextField
              fullWidth
              id="phone"
              value={clientPhone}
              onChange={(e) => handleClientPhoneChange(e)}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
              inputProps={{
                style: {
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Client Address:</Typography>

            <AddressGoogle setAddress={setAddress} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ClientCard.propTypes = {
  client: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([undefined, null]),
  ]),
  setUpdated: PropTypes.func,
};

export default ClientCard;
