import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({}));
const OverviewChips = ({ customer, clients, setClientFilter }) => {
  const classes = useStyles();

  const [chips, setChips] = useState([]);
  const [selectedChip, setSelectedChip] = useState(null);

  useEffect(() => {
    const chips = [];
    clients &&
      clients.map((location) => {
        if (!chips.includes(location.client_org_data.client_org_type)) {
          chips.push(location.client_org_data.client_org_type);
        }
      });
    setChips(["All", ...chips]);
  }, [customer, clients]);

  const handleChipClick = (chip) => {
    if (chip === "All") {
      setClientFilter(null);
    } else {
      setClientFilter(chip);
    }
    setSelectedChip(chip);
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
        {chips.map((chip) => {
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

OverviewChips.propTypes = {
  clients: PropTypes.array.isRequired,
  setClientFilter: PropTypes.func.isRequired,
};

export default OverviewChips;
