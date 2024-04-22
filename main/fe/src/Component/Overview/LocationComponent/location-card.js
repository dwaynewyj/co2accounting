import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import { YEARS } from "../constant.js";

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
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#4690CD",
  },
  location_country: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    fontFamily: "montserrat",
    fontWeight: 900,
    width: 100,
    color: "white",
    borderRadius: 99,
    background:
      "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",

    position: "absolute",
    zIndex: "inherit",
    margin: "15px !important",
  },
  location_info: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "black",
  },
  grid_years: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "scroll",
  },
  grid_year: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    cursor: "pointer",
    "&:hover": {
      background: "#F9F9F9 0% 0% no-repeat padding-box",
    },
  },
  year: {
    fontSize: "16px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#4690CD",
  },
}));

function LocationCard({ location, setGlobalLocation }) {
  const classes = useStyles();

  const handleYearClick = (year) => {
    setGlobalLocation({ year, location });
  };

  return (
    <Card
      key={`location_card_${location._id}`}
      elevation={3}
      sx={{
        scale: "0.9",
        width: "350px !important",
        height: "580px",
        borderRadius: 5,
        // padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 21px 99px #00000012",
      }}
      className={classes.grid_card}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          height: "100%",
          flexWrap: "unset",
        }}
      >
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            className={classes.location_country}
          >{`${location?.client_loc_data.client_loc_country}`}</Typography>
          <img
            src={"/static/location-small.png"}
            alt={"/static/location-small.png"}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Grid>

        <Grid
          item
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "20px",

            borderBottom: "1px solid gray",
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{}}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Typography className={classes.title}>
                {location?.client_loc_data?.client_loc_name}
              </Typography>
            </Grid>

            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                  gap: 10,
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
                  <LocationOnIcon
                    style={{
                      padding: 3,
                    }}
                  />
                  <Typography className={classes.location_info}>
                    {location?.client_loc_data?.client_loc_address}
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
                  <CallIcon
                    style={{
                      padding: 3,
                    }}
                  />
                  <Typography className={classes.location_info}>
                    {location?.client_loc_data?.client_loc_phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.grid_years}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              height: "100%",
            }}
          >
            {YEARS.map((year) => {
              return (
                <Grid
                  key={`location_${location._id}_year_${year}`}
                  item
                  className={classes.grid_year}
                  onClick={() => handleYearClick(year)}
                >
                  <Typography className={classes.year}>{year}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

LocationCard.propTypes = {
  location: PropTypes.object.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
};

export default LocationCard;
