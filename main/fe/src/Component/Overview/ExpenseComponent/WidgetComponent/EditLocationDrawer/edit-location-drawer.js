import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

import DrawerMain from "./drawer-main.js";

const useStyles = makeStyles((theme) => ({
  grid_item_header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  created: {
    fontSize: "12px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "white",
  },
  location: {
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "white",
  },
}));

const EditLocationDrawer = function EditLocationDrawer({
  drawer,
  toggleDrawer,
  client,
  location,
  year,
  setUpdated,
  setOverview,
  setExpenseUpdated,
  setExpenseReset,
  setGlobalExpense,
  setGlobalLocation,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const currentUser = useSelector((state) => state.user);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const list = (anchor) => (
    <Box sx={{}} role="presentation">
      <DrawerMain
        client={client}
        location={location}
        year={year}
        setUpdated={setUpdated}
        setOverview={setOverview}
        setExpenseUpdated={setExpenseUpdated}
        setExpenseReset={setExpenseReset}
        setGlobalExpense={setGlobalExpense}
        setGlobalLocation={setGlobalLocation}
      />
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          width: !fullScreen ? "30vw" : "100%",
          overflowX: "hidden",
        },
      }}
    >
      {list("right")}
    </SwipeableDrawer>
  );
};

EditLocationDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])])
    .isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setUpdated: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  setExpenseUpdated: PropTypes.func.isRequired,
  setGlobalExpense: PropTypes.func.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
};

export default EditLocationDrawer;
