import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import LinearProgress from "@mui/material/LinearProgress";
import ColumnMapCard from "./column-map-card.js";
import CreateExpenseCard from "./create-expense-card.js";
import {
  axiosRootInstance,
  axiosBaseInstance,
} from "../../../Service/axios-instance.js";
import logger from "../../../Service/logger.js";

function CreateExpense({
  client,
  location,
  year,
  open,
  setOpen,
  setExpenseUpdated,
}) {
  const { user } = useAuth0();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //============================================================================
  // Import Expense Dialog
  //============================================================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExpense(null);
  };

  //============================================================================
  // Column Mapping
  //============================================================================
  const [customColumn, setCustomColumn] = useState(false);
  const handleCustomColumns = () => {
    setCustomColumn(true);
  };
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    if (!expense) {
      setCustomColumn(false);
    } else {
      fetchExpenseHeader();
    }
  }, [expense, setExpense]);

  const [columnMap, setColumnMap] = useState({
    name: null,
    date: null,
    id: null,
    payee: null,
    gl: null,
    amount: null,
  });
  const [expenseHeaders, setExpenseHeaders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchExpenseHeader = () => {
    const fetchExpenseHeaderData = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-get-csv-headers`
            : `/staging-sc2-get-csv-headers`;

        const response = await axiosRootInstance.get(url, {
          params: {
            client_loc_id: location._id,
            file_name: expense.name,
            year: year,
          },
        });

        setExpenseHeaders(response?.data?.record?.headers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchExpenseHeaderData();
  };

  useEffect(() => {
    // setLocation({ ...location, address: address });
  }, [columnMap, setColumnMap]);

  //============================================================================
  // Import Expense
  //============================================================================
  const handleCreateExpense = () => {
    importExpenses(location._id);
  };

  const importExpenses = () => {
    const importExpensesData = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-post-call-parse-csv`
            : `/staging-sc2-post-call-parse-csv`;

        const data = {
          client_loc_id: location._id,
          user_id: user.sub,
          file_name: expense.name,
          ledger_year: year,
          header_map: columnMap,
        };

        // const metaData = {
        //   client_loc_id: location._id,
        //   year: parseInt(year),
        //   last_expense_id: "",
        //   import_status: 0,
        // };

        // const endpointPromises = [
        //   axiosRootInstance.post(url, data),
        //   axiosBaseInstance.put(
        //     `${process.env.REACT_APP_SERVER_URL}/expense/meta`,
        //     metaData,
        //   ),
        // ];

        // const responses = await Promise.all(endpointPromises);

        // const allEndpointsSuccessful = responses.every(
        //   (response) => response?.status === 200,
        // );

        // if (allEndpointsSuccessful) {

        const response = await axiosRootInstance.post(url, data);
        if (response?.data?.status === "SUCCESS") {
          setColumnMap({
            name: null,
            date: null,
            id: null,
            payee: null,
            gl: null,
            amount: null,
          });

          setExpenseUpdated(true);
          handleClose();
        } else {
          logger.error("Not all endpoints were successful");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    importExpensesData();
  };

  //============================================================================
  // Util
  //============================================================================
  const isFieldsNotEmpty = (formData, fields) => {
    if (!formData) {
      return false;
    }
    for (const field of fields) {
      if (!formData[field] || Object.values(formData[field]).length <= 0) {
        return false;
      }
    }
    return true;
  };

  //============================================================================
  // Sub Components
  //============================================================================
  const CreateExpenseButton = () => {
    return (
      <Button
        disabled={!isFieldsNotEmpty(columnMap, Object.keys(columnMap))}
        key={"create_expense"}
        sx={{
          borderRadius: 100,
          border: "none",
          height: "33px",
          width: "200px",
          border: "none",
          background:
            "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
          ":hover": {
            opacity: 0.6,
          },

          ":disabled": {
            background: "grey",
            color: "white",
          },

          fontSize: 12,
          fontFamily: "montserrat",
          fontWeight: 900,
          color: "white",
          textWrap: "nowrap",
          paddingLeft: 3,
          paddingRight: 3,
          textTransform: "none",
        }}
        onClick={() => handleCreateExpense()}
      >
        Import
      </Button>
    );
  };

  const ContinueButton = () => {
    return (
      <Button
        disabled={!expense || expenseHeaders.length <= 0 || isLoading}
        key={"continue_expense"}
        size="sm"
        onClick={handleCustomColumns}
      >
        Continue
      </Button>
    );
  };

  //============================================================================
  // Main Render
  //============================================================================
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {customColumn ? (
            <Typography
              style={{
                fontSize: 16,
                fontFamily: "montserrat",
                fontWeight: 900,
                color: "#4690CD",
              }}
            >
              {`Expense Column Map`}
            </Typography>
          ) : (
            <Typography
              style={{
                fontSize: 16,
                fontFamily: "montserrat",
                fontWeight: 900,
                color: "#4690CD",
              }}
            >
              {`Import Expense For `}{" "}
              <span
                style={{
                  fontSize: 16,
                  fontFamily: "montserrat",
                  fontWeight: 900,
                  color: "#999E9F",
                }}
              >{`${year}`}</span>
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
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
              xs
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!customColumn ? (
                <CreateExpenseCard
                  location={location}
                  year={year}
                  expense={expense}
                  setExpense={setExpense}
                  setIsLoading={setIsLoading}
                />
              ) : (
                <ColumnMapCard
                  expenseHeaders={expenseHeaders}
                  columnMap={columnMap}
                  setColumnMap={setColumnMap}
                />
              )}
            </Grid>

            {isLoading && (
              <Grid
                item
                xs
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearProgress
                  style={{
                    width: "200px",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!customColumn ? <ContinueButton /> : <CreateExpenseButton />}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateExpense.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setOpen: PropTypes.func.isRequired,
  setExpenseUpdated: PropTypes.func.isRequired,
};

export default CreateExpense;
