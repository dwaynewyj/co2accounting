import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({}));
const LoadingPage = ({}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <img
          src={"/static/logo.svg"}
          alt={"/static/logo.svg"}
          style={{ width: 200 }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#4690CD",
          }}
        >
          Please Select Options From The Menu
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoadingPage;
