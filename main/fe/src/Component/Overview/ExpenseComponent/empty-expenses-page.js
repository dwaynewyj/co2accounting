import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import empty_expense_icon from "./assets/empty-expense.svg";

import ImportExpenseButton from "./SharedComponent/import-expense-button.js";

const useStyles = makeStyles((theme) => ({}));
const EmptyExpensesPage = ({ uploadOpen, setUploadOpen }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <img
          src={empty_expense_icon}
          alt={empty_expense_icon}
          style={{ width: 200 }}
        />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#4690CD",
          }}
        >
          Import Your Data
        </Typography>
      </Grid>

      <Grid
        item
        style={{
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          Upload your expense data in a csv format to get started. Determine
          which year you would like to report and select the desired year on the
          top navigation.
        </Typography>
      </Grid>

      <Grid
        item
        style={{
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <ImportExpenseButton
          primary={true}
          action={() => setUploadOpen(true)}
        />
      </Grid>

      <Grid
        item
        style={{
          maxWidth: "50%",
          textAlign: "center",
          paddingTop: 100,
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#404040",
          }}
        >
          {`Not sure where to start? Visit our `}
          <a
            style={{
              textDecoration: "underline",
            }}
            onClick={() => {
              const newWindow = window.open(
                "https://www.climateaccounting.com/help-center/getting-started-with-scop3 ",
                "_blank",
              );
              newWindow.focus();
            }}
          >{`Help Center`}</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyExpensesPage;
