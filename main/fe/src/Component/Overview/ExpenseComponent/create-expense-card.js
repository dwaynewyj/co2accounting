import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImportExpense from "./ImportExpense/import-expense.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: 15,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
}));

function CreateExpenseCard({
  location,
  year,
  expense,
  setExpense,
  setIsLoading,
}) {
  const classes = useStyles();

  return (
    <Card
      elevation={0}
      sx={{
        width: "500px",
        height: "100%",
        borderRadius: 10,
        padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        // boxShadow: "0px 0px 20px 0px #00000019",
      }}
    >
      <CardContent>
        <ImportExpense
          location={location}
          year={year}
          expense={expense}
          setExpense={setExpense}
          setIsLoading={setIsLoading}
        />
      </CardContent>
    </Card>
  );
}

CreateExpenseCard.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expense: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setExpense: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default CreateExpenseCard;
