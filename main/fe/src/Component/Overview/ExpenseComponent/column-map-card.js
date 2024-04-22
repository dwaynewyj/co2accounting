import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.end,
    width: "100%",
    flexWrap: "nowrap",
    gap: 20,
  },

  grid_column: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  column_header: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#4690CD",
  },
}));

function ColumnMapCard({ expenseHeaders, columnMap, setColumnMap }) {
  const classes = useStyles();
  const [locationName, setLocationName] = useState("");
  const handleClientNameChange = (event) => {
    setLocationName(event.target.value);
    // setLocation({ ...location, name: event.target.value });
  };

  const [locationPhone, setLocationPhone] = useState("");
  const handleClientPhoneChange = (event) => {
    setLocationPhone(event.target.value);
    // setLocation({ ...location, phone: event.target.value });
  };

  const [address, setAddress] = useState({});

  const [age, setAge] = React.useState("");

  const handleChange = (event, key) => {
    setColumnMap({ ...columnMap, [key]: event.target.value });
  };
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const COLUMN_MAP = {
    name: "Account Name",
    date: "Date",
    id: "Invoice Number",
    payee: "Payee",
    gl: "Description",
    amount: "Amount",
  };
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
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_card}
        >
          {Object.entries(columnMap).map(([key, value], index) => {
            return (
              <Grid item className={classes.grid_column} key={index}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="center"
                  style={{
                    width: "100%",
                    flexWrap: "nowrap",
                  }}
                >
                  <Grid
                    item
                    style={{
                      width: "100%",
                    }}
                  >
                    <Typography className={classes.column_header}>
                      {`${COLUMN_MAP[key]}:`}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    style={{
                      width: "100%",
                    }}
                  >
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">
                        Imported Column
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={columnMap[key] ?? ""}
                        onChange={(event) => handleChange(event, key)}
                        sx={{
                          fontSize: 16,
                          // padding: "10px",
                        }}
                      >
                        {expenseHeaders.map((header, index) => {
                          return (
                            <MenuItem
                              value={header}
                              key={index}
                              style={{
                                fontSize: 16,
                              }}
                            >
                              {header}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

ColumnMapCard.propTypes = {
  expenseHeaders: PropTypes.array.isRequired,
  // columnMap: PropTypes.object.isRequired,
  setColumnMap: PropTypes.func.isRequired,
};

export default ColumnMapCard;
