import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const EditHeader = ({ location, year }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        padding: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 32,
            fontFamily: "montserrat",
            fontWeight: 900,
            color: "#4690CD",
          }}
        >
          {`Calculate GHG`}{" "}
          <span
            style={{
              fontSize: 32,
              fontFamily: "montserrat",
              fontWeight: 500,
              color: "#999E9F",
            }}
          >{`${location.client_loc_data.client_loc_name} ${year}`}</span>{" "}
          {`Expenses`}
        </Typography>
      </Grid>
    </Grid>
  );
};

EditHeader.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditHeader;
