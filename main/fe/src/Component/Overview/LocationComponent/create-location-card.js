import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddressGoogle from "../../Main/Component/AddressGoogle/address-google.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
    gap: 15,
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
}));

function CreateLocationCard({ location, setLocation }) {
  const classes = useStyles();

  //   client_loc_name
  // "Westside Plant"
  // client_loc_address
  // "441-100 Innovation Drive"
  // client_loc_city
  // "Winnipeg"
  // client_loc_state
  // "MB"
  // client_loc_country
  // "Canada"
  // client_loc_zip
  // "R3T 6G2"
  // client_loc_phoneNumber
  // "2262342402"

  const [locationName, setLocationName] = useState("");
  const handleLocationNameChange = (event) => {
    setLocationName(event.target.value);
    setLocation({ ...location, name: event.target.value });
  };

  const [locationPhone, setLocationPhone] = useState("");
  const handleLocationPhoneChange = (event) => {
    setLocationPhone(event.target.value);
    setLocation({ ...location, phone: event.target.value });
  };

  const [address, setAddress] = useState({});

  useEffect(() => {
    setLocation({ ...location, address: address });
  }, [address, setAddress]);

  return (
    <Card
      elevation={0}
      sx={{
        width: "500px",
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
          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Location Name:</Typography>
            <TextField
              fullWidth
              id="name"
              value={locationName}
              onChange={(e) => handleLocationNameChange(e)}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Location Phone:</Typography>
            <TextField
              fullWidth
              id="phone"
              value={locationPhone}
              onChange={(e) => handleLocationPhoneChange(e)}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Location Address:</Typography>

            <AddressGoogle setAddress={setAddress} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CreateLocationCard.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setLocation: PropTypes.func.isRequired,
};

export default CreateLocationCard;
