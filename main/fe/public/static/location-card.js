import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",

    "&:hover": {
      boxShadow: "0px 21px 99px #00000033",
      transition: "box-shadow 1s",
    },
  },

  // title: {
  //   display: theme.display.flex,
  //   justifyContent: theme.justifyContent.start,
  //   alignItems: theme.alignItems.start,
  //   width: "100%",
  //   flexDirection: "column !important",
  // },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#4690CD",
  },
}));

function LocationCard({ location }) {
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

  return (
    <Card
      elevation={3}
      sx={{
        scale: "0.8",
        width: "380px !important",
        height: "340px",
        borderRadius: 5,
        padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 21px 99px #00000012",
      }}
      className={classes.grid_card}
    >
      <CardContent
        style={{
          width: "100%",
          // height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            xs={6}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={"/static/logo.svg"}
              alt={"/static/logo.svg"}
              style={{ width: 200 }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Typography className={classes.title}>
              {location?.client_loc_data?.client_loc_name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default LocationCard;
