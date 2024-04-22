import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

function CreateClientCard({ setClient }) {
  const classes = useStyles();

  const [clientData, setClientData] = useState({
    name: "",
    industry: "",
    type: "",
    phone: "",
  });
  const handleClientChange = (event, key) => {
    setClientData({ ...clientData, [key]: event.target.value });
    setClient(clientData);
  };

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
            <Typography className={classes.label}>Client Name:</Typography>
            <TextField
              fullWidth
              value={clientData.name}
              onChange={(e) => handleClientChange(e, "name")}
              inputProps={{
                style: {
                  fontSize: 12,
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
              value={clientData.phone}
              onChange={(e) => handleClientChange(e, "phone")}
              inputProps={{
                style: {
                  fontSize: 12,
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
              value={clientData.industry}
              onChange={(e) => handleClientChange(e, "industry")}
              inputProps={{
                style: {
                  fontSize: 12,
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
              value={clientData.type}
              onChange={(e) => handleClientChange(e, "type")}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CreateClientCard.propTypes = {
  setClient: PropTypes.func.isRequired,
};

export default CreateClientCard;
