import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import moment from "moment";

import { COLUMNS } from "../ExpenseTable/constant.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
    gap: 15,
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
  date_picker: {
    width: "100%",
    "& .MuiIconButton-root:focus": {
      outline: 0,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black !important",
    },
  },
}));

function CreateSingleExpenseCard({ year, singleExpense, setSingleExpense }) {
  const classes = useStyles();

  const handleSingleExpenseChange = (event, key, type) => {
    if (type === "date") {
      setSingleExpense({
        ...singleExpense,
        [key]: moment(event).format("MM/DD/YYYY"),
      });
    } else {
      setSingleExpense({ ...singleExpense, [key]: event.target.value });
    }
  };

  useEffect(() => {}, [singleExpense, setSingleExpense]);

  const minDate = dayjs().year(year).startOf("year");
  const maxDate = dayjs().year(year).endOf("year");

  const CustomDatePickerIcon = () => (
    <IconButton className={classes.customIcon}>
      <CalendarMonthIcon />
    </IconButton>
  );

  const OpenPickerIcon = styled(CalendarMonthIcon)({
    backgroundColor: "white",
  });

  return (
    <Card
      elevation={0}
      sx={{
        width: "500px",
        height: "100%",
        borderRadius: 10,
        padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
      }}
    >
      <CardContent
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_card}
        >
          {COLUMNS.map((column) => {
            return (
              column.input && (
                <Grid
                  item
                  className={classes.label_grid}
                  key={`add_single_expense_${column.id}`}
                >
                  <Typography className={classes.label}>
                    {`${column.label}:`}
                  </Typography>
                  {column.type === "date" ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className={classes.date_picker}
                        label=""
                        inputFormat="MM/DD/YYYY"
                        value={dayjs(singleExpense[column.id])}
                        onChange={(newValue) =>
                          handleSingleExpenseChange(
                            newValue,
                            column.id,
                            column.type,
                          )
                        }
                        renderInput={(startProps, endProps) => (
                          <React.Fragment>
                            <TextField
                              {...startProps}
                              sx={{
                                width: "100%",
                                input: {
                                  fontSize: 13,
                                  fontFamily: "montserrat",
                                },
                                label: {
                                  fontSize: 13,
                                  fontFamily: "montserrat",
                                },
                                outline: "0 !important",
                              }}
                            />
                            <IconButton>
                              <CalendarMonthIcon />
                            </IconButton>
                          </React.Fragment>
                        )}
                        minDate={dayjs().year(year).startOf("year")}
                        maxDate={dayjs().year(year).endOf("year")}
                      />
                    </LocalizationProvider>
                  ) : (
                    <TextField
                      type={column.type}
                      fullWidth
                      value={singleExpense[column.id] ?? ""}
                      onChange={(e) =>
                        handleSingleExpenseChange(e, column.id, column.type)
                      }
                      inputProps={{
                        style: {
                          fontSize: 15,
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                        },
                      }}
                      InputProps={{
                        sx: { borderRadius: "10px" },
                      }}
                    />
                  )}
                </Grid>
              )
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

CreateSingleExpenseCard.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  singleExpense: PropTypes.object.isRequired,
  setSingleExpense: PropTypes.func.isRequired,
};

export default CreateSingleExpenseCard;
