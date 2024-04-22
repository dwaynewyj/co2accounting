import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    padding: "20px",
    flexWrap: "nowrap",
  },

  grid_left_container: {
    width: "100%",
    flexWrap: "nowrap",
    paddingRight: 20,
  },
  grid_left_item: {
    width: "100%",
    height: "100%",

    flexWrap: "nowrap !important",
    gap: 10,

    cursor: "pointer",
    "&:hover": {
      background: "#F8F8F8 0% 0% no-repeat padding-box",
    },
  },

  grid_left_item_icon: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  left_icon: {
    fontSize: "16px !important",
    color: "#3E454B",
  },

  left_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#3E454B",
  },
}));
const SettingLeft = () => {
  const classes = useStyles();
  const { user } = useAuth0();

  const scrollToAnchor = (key) => {
    const anchor = document.getElementById(key);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid item xs={3} style={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.grid_left_container}
      >
        <Grid item style={{ width: "100%", height: 80 }}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.grid_left_item}
            onClick={() => scrollToAnchor("personal-anchor")}
          >
            <Grid item className={classes.grid_left_item_icon}>
              <PersonIcon className={classes.left_icon} />
            </Grid>

            <Grid item style={{ width: "100%" }}>
              <Typography className={classes.left_title}>Profile</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ width: "100%", height: 80 }}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.grid_left_item}
            onClick={() => scrollToAnchor("billing-anchor")}
          >
            <Grid item className={classes.grid_left_item_icon}>
              <CreditCardIcon className={classes.left_icon} />
            </Grid>

            <Grid item style={{ width: "100%" }}>
              <Typography className={classes.left_title}>Billing</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ width: "100%", height: 80 }}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.grid_left_item}
            onClick={() => scrollToAnchor("question-anchor")}
          >
            <Grid item className={classes.grid_left_item_icon}>
              <HelpIcon className={classes.left_icon} />
            </Grid>

            <Grid item style={{ width: "100%" }}>
              <Typography className={classes.left_title}>
                Help/Support
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingLeft;
