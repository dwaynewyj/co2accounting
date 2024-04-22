import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  item_container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label_grid: {
    display: "flex",
    justifyContent: "flex-start",
  },
  value_grid: {
    display: "flex",
    justifyContent: "end",
  },
  label_text: {
    fontSize: "12px !important",
    fontFamily: "montserrat",
    fontWeight: "900 !important",
    color: "#4690CD",
  },
  value: {
    fontSize: "12px !important",
    fontFamily: "montserrat",
    fontWeight: 900,
    textAlign: "end",
  },
}));

const EditLeft = ({ singleExpense, expenseIndex, totalExpenses, expenses }) => {
  const classes = useStyles();

  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const currentProgress = expenses.reduce((acc, element) => {
      if (Object.keys(element.ghg_data).length !== 0) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setProgress(Math.ceil((currentProgress / totalExpenses) * 100));
  }, [singleExpense]);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
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
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "montserrat",
            fontWeight: 900,
            color: "#4690CD",
          }}
        >
          {`Expense ${expenseIndex + 1}/${totalExpenses}`}
        </Typography>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography
              className={classes.label_text}
            >{`Account Name: `}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography
              className={classes.label_text}
            >{`Invoice #: `}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.id}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography className={classes.label_text}>{`Date: `}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography className={classes.label_text}>{`Amount: `}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.amount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography className={classes.label_text}>{`Payee: `}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.payee}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={6} className={classes.label_grid}>
            <Typography className={classes.label_text}>
              {`Memo/Description: `}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.value_grid}>
            <Typography className={classes.value}>
              {singleExpense?.expense_data?.gl}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.item_container}
        >
          <Grid item xs={4} className={classes.label_grid}>
            <Typography
              className={classes.label_text}
            >{`Progress (${progress}%): `}</Typography>
          </Grid>
          <Grid item xs={8} className={classes.value_grid}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditLeft.propTypes = {
  singleExpense: PropTypes.object.isRequired,
  expenseIndex: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  expenses: PropTypes.array,
};

export default EditLeft;
