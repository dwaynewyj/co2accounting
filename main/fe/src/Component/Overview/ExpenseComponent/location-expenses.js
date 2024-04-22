import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Grid, Divider, Button, CircularProgress } from "@mui/material";
import LocationHeader from "./location-header.js";
import EmptyExpensesPage from "./empty-expenses-page.js";
import LocationChips from "./location-chips.js";
import ExpenseWidgets from "./expense-widgets.js";
import ExpenseTable from "./ExpenseTable/expense-table.js";
import CreateSingleExpense from "./SingleExpenseComponent/create-single-expense.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({}));
const LocationExpenses = ({
  client,
  location,
  year,
  setYear,
  setUpdated,
  setOverview,
  setGlobalExpense,
  setGlobalLocation,
}) => {
  const classes = useStyles();

  const [expenses, setExpenses] = useState(null);
  const [expenseUpdated, setExpenseUpdated] = useState(false);
  const [expenseReset, setExpenseReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredExpenses, setFilteredExpenses] = useState(null);

  const fetchExpenses = (cust_org_id) => {
    let expenseDataLength = 0;
    setIsLoading(true);
    const fetchExpensesData = async () => {
      try {
        const response = await axiosBaseInstance.get("/expense", {
          params: {
            client_loc_id: location._id,
            year: year,
          },
        });

        let expensesData = response?.data?.expenses;
        setExpenses(expensesData);

        if (expenseReset) {
          setExpenses([]);
          setExpenseReset(false);
        } else if (
          (expenseUpdated && expensesData.length === 0) ||
          expensesData.length !== expenseDataLength
        ) {
          expenseDataLength = expensesData.length;
          setExpenses(expensesData);
          await fetchExpensesData();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
      setExpenseUpdated(false);
    };
    fetchExpensesData();
  };

  const fetchExpenseMeta = async () => {
    try {
      const metaUrl = `${process.env.REACT_APP_SERVER_URL}/expense/meta`;
      const requestBody = {
        client_loc_id: location._id,
        year: parseInt(year),
      };

      const metaResponse = await axiosBaseInstance.get(metaUrl, {
        params: requestBody,
      });

      const importStatus = metaResponse?.data?.result?.import_status;

      if (importStatus === 1) {
        setIsLoading(true);
        await fetchExpenses();
      }
    } catch (error) {
      console.error("Error occurred while fetching meta:", error);
    }
  };

  useEffect(() => {
    setExpenses(null);
    if (client) {
      fetchExpenses();
    }
  }, [client, location, year, expenseUpdated]);

  const [open, setOpen] = useState(false);

  const handleGhgAnalysis = () => {
    if (filteredExpenses && filteredExpenses.length > 0) {
      setGlobalExpense({
        expenses: filteredExpenses,
        index: 0,
        location: location,
        year: year,
      });
    }
  };

  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        height: expenses?.length <= 0 && "inherit",
        padding: "20px",
        flexWrap: "unset",
      }}
    >
      <CreateSingleExpense
        location={location}
        year={year}
        filteredExpenses={filteredExpenses}
        open={open}
        setOpen={setOpen}
        setExpenseUpdated={setExpenseUpdated}
      />

      <Grid item xs={2} style={{ width: "100%" }}>
        <LocationHeader
          client={client}
          location={location}
          year={year}
          expenses={expenses}
          filteredExpenses={filteredExpenses}
          setExpenseUpdated={setExpenseUpdated}
          setGlobalExpense={setGlobalExpense}
          uploadOpen={uploadOpen}
          setUploadOpen={setUploadOpen}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <LocationChips
          year={year}
          setYear={setYear}
          setExpenses={setExpenses}
        />
      </Grid>

      {expenses && expenses.length > 0 ? (
        <>
          <Grid item style={{ width: "100%" }}>
            <ExpenseWidgets
              client={client}
              expenses={expenses}
              location={location}
              year={year}
              setUpdated={setUpdated}
              setOverview={setOverview}
              setExpenseUpdated={setExpenseUpdated}
              setExpenseReset={setExpenseReset}
              setGlobalExpense={setGlobalExpense}
              setGlobalLocation={setGlobalLocation}
            />
          </Grid>

          <Grid
            item
            xs
            style={{ width: "100%", height: "2px", paddingTop: 50 }}
          >
            <Divider style={{ width: "100%" }} flexItem />
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              padding: "50px 0 20px 0",

              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              style={{
                width: "100%",
                // flexWrap: "nowrap",
                gap: 10,
              }}
            >
              <Grid item style={{}}>
                <Button
                  size="md"
                  variant="secondary"
                  endIcon={<AddIcon />}
                  onClick={() => setOpen(true)}
                >
                  New Expense
                </Button>
              </Grid>

              <Grid item style={{}}>
                {expenses?.length > 0 && (
                  <Button
                    size="md"
                    endIcon={<AddchartIcon />}
                    onClick={handleGhgAnalysis}
                  >
                    Begin GHG Analysis
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              paddingBottom: 50,
            }}
          >
            <ExpenseTable
              expenses={expenses}
              setFilteredExpenses={setFilteredExpenses}
              location={location}
              year={year}
              setGlobalExpense={setGlobalExpense}
              setExpenseUpdated={setExpenseUpdated}
            />
          </Grid>
        </>
      ) : (
        location && (
          <Grid
            item
            xs={10}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isLoading ? (
              <EmptyExpensesPage
                uploadOpen={uploadOpen}
                setUploadOpen={setUploadOpen}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};

LocationExpenses.propTypes = {
  client: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setYear: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  setGlobalExpense: PropTypes.func.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
};

export default LocationExpenses;
