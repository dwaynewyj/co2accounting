import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { YEARS } from "../constant.js";

const useStyles = makeStyles((theme) => ({}));

const LocationChips = ({ year, setYear, setExpenses }) => {
  const classes = useStyles();

  const [chips, setChips] = useState([]);
  const [selectedChip, setSelectedChip] = useState(year);

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    setYear(chip);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
      }}
    >
      <Grid
        item
        xs
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {YEARS.map((chip) => {
          return (
            <Chip
              key={chip}
              label={
                <Typography
                  style={{
                    fontSize: 12,
                    fontFamily: "montserrat",
                    fontWeight: 900,
                    color: chip === selectedChip ? "white" : "#4690CD",
                  }}
                >
                  {chip}
                </Typography>
              }
              clickable
              style={{
                marginRight: 10,
                padding: 10,
                background:
                  chip === selectedChip
                    ? "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box"
                    : "transparent",
                borderColor: "#4690CD",
              }}
              variant={chip === selectedChip ? "default" : "outlined"}
              onClick={() => handleChipClick(chip)}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

Location.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setYear: PropTypes.func.isRequired,
};

export default LocationChips;
