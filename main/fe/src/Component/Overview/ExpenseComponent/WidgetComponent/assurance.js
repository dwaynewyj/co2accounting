import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LinearProgress, Box } from "@mui/material";

const ASSURANCE_COLUMN = ["completion", "confidence", "status"];
const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "nowrap",

    background: "white",
    boxShadow: "0px 21px 99px #00000014",
    borderRadius: 20,
    padding: "20px",
  },
  grid_item: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid_item_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  grid_assurance: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flexWrap: "nowrap",
    gap: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
}));
const Assurance = ({ dashboard, year }) => {
  const classes = useStyles();
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const LinearProgressWithLabel = (props) => {
    const { value } = props;
    return (
      <Box
        display="flex"
        alignItems="center"
        style={{
          width: "100%",
        }}
      >
        <Box
          width="100%"
          mr={1}
          style={{ width: "100%", position: "relative" }}
        >
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              color: "#4690CD",
              animationDuration: "550ms",
              left: 0,
              minWidth: "100% !important",
              height: 30,
              borderRadius: 50,
            }}
          />

          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: 20,
              color: "white",
              fontSize: "16px !important",
              fontFamily: "Montserrat",
              fontWeight: 900,
            }}
          >{`${value.toFixed(2)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.grid_root}
    >
      <Grid
        item
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Grid container spacing={0} direction="column">
          <Grid item className={classes.grid_item_title}>
            <Typography size="md" variant="subtitle">
              Location
            </Typography>
          </Grid>

          <Grid item className={classes.grid_item_title}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 900,
                color: "#467EC7",
              }}
            >
              Assurance
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.grid_item}>
        <Grid
          container
          spacing={0}
          direction="row"
          className={classes.grid_assurance}
        >
          {dashboard[year] &&
            Object.entries(dashboard[year]).map(([key, value]) => {
              if (ASSURANCE_COLUMN.includes(key)) {
                return (
                  <Fade key={`assurance_${key}`} in={true} timeout={1000}>
                    <Grid
                      item
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "nowrap",
                          gap: 10,
                        }}
                      >
                        <Grid
                          item
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="subtitle" size="sm">
                            {capitalizeString(key)}
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
                          <LinearProgressWithLabel value={value} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Fade>
                );
              }
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

Assurance.propTypes = {
  dashboard: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Assurance;
