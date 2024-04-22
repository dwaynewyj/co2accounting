import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Alert as MuiAlert,
  useMediaQuery,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import { makeStyles } from "@mui/styles";
import { MESSAGES } from "./messages.js";
import EditAction from "./edit-action.js";
import EditHeader from "./edit-header";
import EditLeft from "./edit-left.js";
import EditMiddle from "./edit-middle.js";
import { axiosRootInstance } from "../../../../Service/axios-instance.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "nowrap",
  },
  snackbar_text: {
    fontSize: "12px !important",
    fontFamily: "montserrat",
    fontWeight: 900,
  },

  grid_header: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  grid_edit: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column !important",
  },
  grid_edit_item: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start !important",
    flexWrap: "nowrap",
  },
  grid_action: {
    // maxWidth: "-webkit-fill-available",
    width: "100%",
    // position: "fixed",
    // bottom: 0,
  },
}));

const EditExpense = ({ client, year, globalExpense, setGlobalExpense }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const { expenses, index, location } = globalExpense;

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarError, setSnackbarError] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [customerOrganization, setCustomerOrgranization] = useState(null);
  const [expenseIndex, setExpenseIndex] = useState(index);

  const [singleExpense, setSingleExpense] = useState(expenses[expenseIndex]);

  const expensesList = expenses;
  const selectedRowIndex = index;

  const onExitClick = () => {
    setGlobalExpense(null);
  };

  const getNextIncompleteIndex = () => {
    const nextIndex = expenses.findIndex(
      (element, index) =>
        index > expenseIndex && Object.keys(element.ghg_data).length <= 0,
    );
    return nextIndex;
  };

  const onPrevClick = () => {
    const prevIndex = expenseIndex > 1 ? expenseIndex - 1 : 0;
    setExpenseIndex(prevIndex);
    setSingleExpense({ ...expenses[prevIndex] });
  };

  const onNextClick = () => {
    const nextIndex = expenseIndex + 1 < expenses.length ? expenseIndex + 1 : 0;
    setExpenseIndex(nextIndex);
    setSingleExpense({ ...expenses[nextIndex] });
  };

  const [ghgData, setGhgData] = useState(null);
  const [decisionData, setDecisionData] = useState(null);

  useEffect(() => {
    setGhgData(ghgData);
    handleGhgSingleExpense(ghgData, decisionData);
  }, [ghgData, setGhgData]);

  const handleGhgSingleExpense = async (data, decisionData) => {
    let payload = {
      _id: singleExpense?._id,
      user_id: user.sub,
      ledger_year: year.toString(),
      expense_id: singleExpense?.expense_id,
      client_loc_id: singleExpense?.client_loc_id,
      expense_data: singleExpense?.expense_data,
      ghg_data: data,
      decision_data: decisionData,
    };

    try {
      const url =
        process.env.REACT_APP_STAGE === "PRODUCTION"
          ? `/production-sc2-crud-single-expense`
          : `/staging-sc2-crud-single-expense`;
      const response = await axiosRootInstance.put(url, payload);
      expenses[expenseIndex] = { ...response?.data?.record };
      setSingleExpense({ ...response?.data?.record });
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarError(true);
      setSnackbarMessage(MESSAGES.CALCULATION_FAILED);
      console.error("Error occurred:", error);
    }
  };

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const [locationAllLoading, setLocationAllLoading] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_root}
    >
      <Snackbar
        // open={true}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {!snackbarError ? (
          <MuiAlert
            severity="success"
            elevation={6}
            variant="filled"
            onClose={handleClose}
            sx={{
              "& .MuiAlert-icon": {
                alignItems: "center",
              },
              "& .MuiAlert-action": {
                alignItems: "center",
                padding: "5px",
                scale: "1.5",
              },
            }}
          >
            <Typography className={classes.snackbar_text}>
              {snackbarMessage}
            </Typography>
          </MuiAlert>
        ) : (
          <MuiAlert
            severity="error"
            elevation={6}
            variant="filled"
            onClose={handleClose}
            sx={{
              "& .MuiAlert-icon": {
                alignItems: "center",
              },
              "& .MuiAlert-action": {
                alignItems: "center",
                padding: "5px",
                scale: "1.5",
              },
            }}
          >
            <Typography className={classes.snackbar_text}>
              {snackbarMessage}
            </Typography>
          </MuiAlert>
        )}
      </Snackbar>

      <Grid item className={classes.grid_header}>
        <EditHeader location={location} year={year} />
      </Grid>

      <Grid item className={classes.grid_edit}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_edit_item}
        >
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              width: fullScreen ? "100%" : "30%",
              padding: "20px",
            }}
          >
            <EditLeft
              singleExpense={singleExpense}
              expenseIndex={expenseIndex}
              totalExpenses={expenses.length}
              expenses={expenses}
            />
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              // height: "100vh",
              width: fullScreen ? "100%" : "60%",
            }}
          >
            <EditMiddle
              client={client}
              year={year}
              user_id={user.sub}
              expenses={expenses}
              singleExpense={singleExpense}
              setSingleExpense={setSingleExpense}
              ghgData={ghgData}
              setGhgData={setGhgData}
              decisionData={decisionData}
              setDecisionData={setDecisionData}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarError={setSnackbarError}
              setSnackbarMessage={setSnackbarMessage}
              locationAllLoading={locationAllLoading}
              setLocationAllLoading={setLocationAllLoading}
            />
          </Grid>
        </Grid>

        <Grid item className={classes.grid_action}>
          <EditAction
            locationAllLoading={locationAllLoading}
            onPrevClick={onPrevClick}
            onExitClick={onExitClick}
            onNextClick={onNextClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

EditExpense.propTypes = {
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])])
    .isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  globalExpense: PropTypes.object.isRequired,
  setGlobalExpense: PropTypes.func.isRequired,
};

export default EditExpense;
