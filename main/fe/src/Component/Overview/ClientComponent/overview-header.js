import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CreateClient from "./create-client.js";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  grid_header: {
    width: "100%",
    height: "100%",
  },
  grid_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  },
  grid_num_clients: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    gap: 20,
  },
  grid_add_location: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px",
  },
}));

const OverviewHeader = ({ customer, clients, setUpdated }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_header}
    >
      <CreateClient
        customer={customer}
        open={open}
        setOpen={setOpen}
        setUpdated={setUpdated}
      />
      <Grid item xs className={classes.grid_title}>
        <Typography variant="title" size="lg">
          Manage{" "}
          <Typography variant="title-secondary" size="lg">
            Clients
          </Typography>
        </Typography>
      </Grid>
      <Grid
        item
        xs
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid item xs>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs className={classes.grid_num_clients}>
                <Typography size="md" variant="counter">{`${
                  clients?.length ?? 0
                }`}</Typography>
                <Typography variant="subtitle" size="md">
                  Total Clients
                </Typography>
              </Grid>

              <Grid item xs className={classes.grid_add_location}>
                <Button
                  endIcon={<AddIcon style={{ fontSize: 20 }} />}
                  onClick={() => setOpen(true)}
                >
                  Create New Client
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

OverviewHeader.propTypes = {
  customer: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default OverviewHeader;
