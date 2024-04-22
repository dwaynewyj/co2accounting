import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";
import { MESSAGES } from "./messages.js";
import EditRight from "./edit-right";
import { DECISION_TREE, CURRENCY } from "./constant.js";
import { axiosRootInstance } from "../../../../Service/axios-instance.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grid_decisions: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start !important",
    flexWrap: "nowrap",
  },

  grid_decision: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "start",
  },

  grid_decision_item: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  grid_general_qa: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  grid_measurement_qa: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  grid_tree: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "start",
    gap: 10,
  },

  grid_label: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  question: {
    fontSize: "12px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "black",
  },
  select: {
    width: "100%",
    fontSize: "12px !important",
    fontFamily: "montserrat !important",
    fontWeight: "900 !important",
  },
}));

const EditMiddle = ({
  client,
  year,
  user_id,
  expenses,
  singleExpense,
  setSingleExpense,
  ghgData,
  setGhgData,
  decisionData,
  setDecisionData,
  setSnackbarOpen,
  setSnackbarError,
  setSnackbarMessage,
  locationAllLoading,
  setLocationAllLoading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [question, setQuestion] = useState("What type of expense was this?");
  const [answer, setAnswer] = useState("");
  const [currentDecisionKey, setCurrentDecisionKey] = useState("Decision1");
  const [calculateOpen, setCalculateOpen] = useState(false);

  const [locationAll, setLocationAll] = useState(false);
  const [locationExpenses, setLocationExpenses] = useState(
    expenses?.filter((obj) => {
      return (
        obj.expense_data.gl === singleExpense?.expense_data?.gl &&
        obj.expense_data.payee === singleExpense?.expense_data?.payee
      );
    }),
  );

  const [calculatationResult, setCalculatationResult] = useState(
    singleExpense?.ghg_data?.CO2e_kg,
  );

  useEffect(() => {
    setLocationExpenses(
      expenses?.filter((obj) => {
        return obj.expense_data.payee === singleExpense?.expense_data?.payee;
      }),
    );
  }, [expenses]);

  const handleChipClick = () => {
    setLocationAll(!locationAll);
  };

  const handleMeasurementValueChange = (event, key) => {
    let nextDecision = getNextDecision(key);
    // if (event.target.value) {
    let newTree = {
      ...decisionTree,
      [key]: {
        ...decisionTree[key],
        value: event.target.value,
      },
    };
    decisionTree[key].value = event.target.value;
    setDecisionTree(newTree);
    setDefaultValue(event.target.value);

    !decisionTree[key]?.method?.length ||
      (!!decisionTree[nextDecision]?.method?.length &&
        fetchDecision({ [key]: event.target.value }));
    // }
  };

  const handleMeasurementValueSelect = (event, key) => {
    let previousDecision = getPreviousDecision(key);
    if (event.target.value) {
      let newTree = {
        ...decisionTree,
        [key]: {
          ...decisionTree[key],
          answer: event.target.value,
        },
      };
      decisionTree[key].answer = event.target.value;
      setDecisionTree(newTree);
      !decisionTree[key].method?.length &&
        fetchDecision({ [key]: event.target.value });
    }
  };

  const handleMeasurementUnitSelect = (event, key) => {
    let previousDecision = getPreviousDecision(key);
    if (event.target.value) {
      let newTree = {
        ...decisionTree,
        [key]: {
          ...decisionTree[key],
          unit: event.target.value,
        },
      };
      decisionTree[key].unit = event.target.value;
      setDecisionTree(newTree);

      !decisionTree[key].method?.length &&
        fetchDecision({ [key]: event.target.value });
    }
  };

  const handleAnswerSelect = (event, key) => {
    if (event.target.value) {
      let newTree = {
        ...decisionTree,
        [key]: {
          ...decisionTree[key],
          answer: event.target.value,
        },
      };
      decisionTree[key].answer = event.target.value;
      setDecisionTree(newTree);
      fetchDecision({ [key]: event.target.value });
    }
  };

  const [decisionTree, setDecisionTree] = useState({ ...DECISION_TREE });
  const [defaultValue, setDefaultValue] = useState(
    parseFloat(singleExpense?.expense_data?.amount),
  );

  useEffect(() => {
    setDefaultValue(parseFloat(singleExpense?.expense_data?.amount));
    setCalculatationResult(singleExpense?.ghg_data?.CO2e_kg);
    // decisionTree["Decision1"].answer = "";
    if (isEmptyObject(singleExpense?.ghg_data)) {
      setDecisionTree({ ...DECISION_TREE });
      fetchDecision({});
    } else {
      setDecisionTree({ ...singleExpense?.decision_data });
    }
  }, [singleExpense]);

  useEffect(() => {
    setCalculatationResult(calculatationResult);
  }, [calculatationResult, setCalculatationResult]);

  useEffect(() => {
    const filteredFields = Object.entries(decisionTree).filter(
      ([key, field]) => {
        let previousDecision = getPreviousDecision(key);

        return (
          field.method?.length > 0 &&
          (field?.unit?.length > 0 ||
            decisionTree[previousDecision]?.unit?.length > 0)
        );
      },
    );
    if (filteredFields.length > 0) {
      setCalculateOpen(true);
    } else {
      setCalculateOpen(false);
    }
    // setDecisionTree(decisionTree);
    setDecisionData(decisionTree);
  }, [decisionTree, setDecisionTree]);

  const findMatchingKey = (obj1, obj2) => {
    const matchingKeys = Object.keys(obj1).filter((key) =>
      obj2.hasOwnProperty(key),
    );
    return matchingKeys.length > 0 ? matchingKeys[0] : null;
  };

  const getPreviousDecision = (key) => {
    let lastChar = key.charAt(key.length - 1);
    let lastCharNumber = parseInt(lastChar);
    let newLastCharNumber = lastCharNumber - 1;
    return key.slice(0, -1) + newLastCharNumber;
  };

  const getNextDecision = (key) => {
    let lastChar = key.charAt(key.length - 1);
    let lastCharNumber = parseInt(lastChar);
    let newLastCharNumber = lastCharNumber + 1;
    return key.slice(0, -1) + newLastCharNumber;
  };

  const getDecisionIndex = (key) => {
    return parseInt(key.charAt(key.length - 1));
  };

  const fetchDecision = async (data) => {
    let decisionStepKey = Object.keys(data)[0];
    if (decisionStepKey) {
      let resetIndex = getDecisionIndex(decisionStepKey);
      for (
        let index = resetIndex;
        index < Object.keys(decisionTree).length;
        index++
      ) {
        decisionTree[`Decision${index + 1}`] = {
          question: null,
          options: [],
          answer: null,
          value: null,
          unit: null,
          type: null,
        };
      }
    }
    let decisionPayload = {};
    for (const key in decisionTree) {
      if (decisionTree[key].answer) {
        decisionPayload[key] = decisionTree[key].answer;
      }
    }
    try {
      const url =
        process.env.REACT_APP_STAGE === "PRODUCTION"
          ? `/production-sc2-post-factors-decisions`
          : `/staging-sc2-post-factors-decisions`;

      const response = await axiosRootInstance.post(
        url,
        // const response = await axiosBaseInstance.get(
        //   "/calculation/factors-decisions",
        decisionPayload,
      );

      const key = findMatchingKey(decisionTree, response.data.record);

      if (key) {
        let previousDecision = getPreviousDecision(key);
        let decisionQuestion = response.data.record[`${key}_Question`]
          ? response.data.record[`${key}_Question`][0]
          : decisionTree[key].question;

        let decisionMethod = response.data.record[`Method`];
        let decisionMeasure =
          response.data.record[`${previousDecision}_Measure`];
        let decisionAllowedMeasure =
          response.data.record[`${previousDecision}_AllowedMeasures`];
        let decisionType = response.data.record[`${previousDecision}_Type`]
          ? response.data.record[`${previousDecision}_Type`][0]
          : "D";
        let newTree = {
          ...decisionTree,
          [key]: {
            options: response.data.record[key],
            question: decisionQuestion,
            answer: decisionTree[key].answer,
            measure: decisionMeasure,
            allowedMeasure: decisionAllowedMeasure,
            method: decisionMethod,
            type: decisionType,
            value:
              typeof singleExpense?.expense_data?.amount === "string"
                ? Math.abs(
                    parseFloat(
                      singleExpense?.expense_data?.amount
                        ?.toString()
                        .replace(/,/g, ""),
                    ),
                  )
                : Math.abs(parseFloat(singleExpense?.expense_data?.amount)),
          },
        };
        setDecisionTree(newTree);
        setCalculatationResult(0);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const fetchDecisionData = () => {
    fetchDecision({});
  };

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  useEffect(() => {
    if (isEmptyObject(singleExpense?.ghg_data)) {
      setDecisionTree({ ...DECISION_TREE });
      fetchDecisionData();
    }
  }, []);

  useEffect(() => {
    setCalculatationResult(calculatationResult);
  }, [calculatationResult, setCalculatationResult]);

  const getLastDecisionValue = (decisions) => {
    let lastDecisionWithValue = null;
    for (const key in decisions) {
      if (key.endsWith("_value")) {
        lastDecisionWithValue = key;
      }
    }
    return lastDecisionWithValue;
  };

  const handleGhgExpense = async (expense, data) => {
    let payload = {
      _id: expense._id,
      user_id: user_id,
      ledger_year: year.toString(),
      expense_id: expense.expense_id,
      client_loc_id: expense.client_loc_id,
      expense_data: expense.expense_data,
      ghg_data: data,
      decision_data: decisionTree,
    };

    try {
      const url =
        process.env.REACT_APP_STAGE === "PRODUCTION"
          ? `/production-sc2-crud-single-expense`
          : `/staging-sc2-crud-single-expense`;
      const response = await axiosRootInstance.put(url, payload);
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarError(true);
      setSnackbarMessage(MESSAGES.CALCULATION_FAILED);
      console.error("Error occurred:", error);
    }
  };

  const handleCalculateEmissions = async () => {
    const decisionMethod = Object.values(decisionTree).filter((field) => {
      return "method" in field && field.method;
    });

    let payload = {
      user_id: user_id,
      cust_org_id: client.cust_org_id,
      transaction_guid: "123456789012345678901234",
      method_name: decisionMethod[0].method[0],
      Scope: 3,
      currency_conversion: null,
      decision_data: decisionTree,
    };

    const promises = [];

    Object.entries(decisionTree).map(([key, field]) => {
      let previousDecision = getPreviousDecision(key);

      if (field.type === "I") {
        payload[key] = field.answer;
        payload[`${previousDecision}_unit`] = field.unit;

        if (CURRENCY.includes(field.unit)) {
          let dateSplit = singleExpense?.expense_data?.date?.split("/");
          let dateParameter = `${dateSplit[2]}-${dateSplit[0].padStart(
            2,
            "0",
          )}-${dateSplit[1].padStart(2, "0")}`;
          let historicalEndpoint = `https://api.fxratesapi.com/historical?base=${field.unit}&date=${dateParameter}&apikey=${process.env.REACT_APP_EXCHANGE_RATE_KEY}`;

          const exchangeRatePromise = axios
            .get(historicalEndpoint)
            .then((res) => {
              payload.currency_conversion = res.data?.rates;
            });

          promises.push(exchangeRatePromise);
        } else {
          payload.currency_conversion = {};
        }

        payload[`${previousDecision}_value`] = field.value;
        return;
      } else {
        if (field.answer) {
          payload[key] = field.answer;
        }
      }
    });

    await Promise.all(promises);

    //========================================================================
    // Save For All Locations (Same payee and category)
    //========================================================================
    setLocationAllLoading(true);
    if (locationAll && locationExpenses) {
      for (const expense of locationExpenses) {
        let locationPayload = {
          ...payload,
        };
        if (singleExpense._id !== expense._id) {
          locationPayload[`${getLastDecisionValue(payload)}`] = parseFloat(
            expense.expense_data.amount,
          );
        }
        try {
          const url =
            process.env.REACT_APP_STAGE === "PRODUCTION"
              ? `/production-sc2-post-call-method`
              : `/staging-sc2-post-call-method`;
          const response = await axiosRootInstance.post(url, locationPayload);
          if (singleExpense._id === expense._id) {
            setGhgData(response.data.record.ghg_data);
            setCalculatationResult(response.data.record.ghg_data.CO2e_kg);
          } else {
            await handleGhgExpense(expense, response.data.record.ghg_data);
          }
        } catch (error) {
          setSnackbarOpen(true);
          setSnackbarError(true);
          setSnackbarMessage(MESSAGES.PLAN_NOT_FOUND);
          console.error("Error occurred:", error);
        }
      }

      setSnackbarOpen(true);
      setSnackbarError(false);
      setSnackbarMessage(MESSAGES.CALCULATION_SUCCESS);
    } else {
      //========================================================================
      // Single Expense
      //========================================================================
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-post-call-method`
            : `/staging-sc2-post-call-method`;

        const response = await axiosRootInstance.post(url, payload);

        setSnackbarOpen(true);
        setSnackbarError(false);

        setSnackbarMessage(MESSAGES.CALCULATION_SUCCESS);
        setGhgData(response?.data?.record?.ghg_data);
        setCalculatationResult(response?.data?.record?.ghg_data?.CO2e_kg);
      } catch (error) {
        setSnackbarOpen(true);
        setSnackbarError(true);
        setSnackbarMessage(MESSAGES.PLAN_NOT_FOUND);
        // setSnackbarMessage(error.message);
        console.error("Error occurred:", error);
      }
    }
    setLocationAllLoading(false);
  };

  const handleCalculationResultChange = (event) => {
    setCalculatationResult(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_decisions}
    >
      <Grid
        item
        style={{
          width: !fullScreen ? "50%" : "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "20px",
          maxHeight: "99vh",
          overflowY: "scroll",
        }}
      >
        <Grid container direction="column" className={classes.grid_tree}>
          {Object.entries(decisionTree).map(([key, decision]) => {
            let previousDecision = getPreviousDecision(key);

            return (
              decision.options.length > 0 && (
                <Grid key={key} item className={classes.grid_decision}>
                  {decision.type === "D" ? (
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Grid item className={classes.grid_decision_item}>
                        <Typography className={classes.question}>
                          {decision.question}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.grid_decision_item}>
                        {decision.options?.filter((item) => item !== null)
                          .length > 0 && (
                          <Select
                            className={classes.select}
                            value={decision.answer}
                            onChange={(event) => handleAnswerSelect(event, key)}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  "& ..MuiSelect-select": {
                                    fontSize: "12px !important",
                                  },
                                  "& .MuiMenuItem-root": {
                                    borderRadius: 2,
                                    fontSize: "12px !important",
                                    fontFamily: "montserrat",
                                    fontWeight: 900,
                                  },
                                  "& .MuiList-padding": {
                                    minWidth: "100%",
                                  },
                                },
                                style: {
                                  padding: "15px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                },
                              },
                            }}
                            input={
                              <OutlinedInput sx={{ fontSize: 12 }} label="" />
                            }
                          >
                            {decision.options.map((option) => {
                              return (
                                <MenuItem
                                  key={option}
                                  value={option}
                                  style={{ justifyContent: "center" }}
                                >
                                  {option}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      className={classes.item_container}
                    >
                      <Grid item className={classes.grid_decision_item}>
                        {decision.question && (
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            className={classes.item_container}
                          >
                            <Grid item className={classes.grid_general_qa}>
                              <Typography className={classes.question}>
                                {decision.question}
                              </Typography>
                            </Grid>

                            <Grid item className={classes.grid_general_qa}>
                              {decision.options?.length && (
                                <Select
                                  key={`TextField_value_select_${key}`}
                                  className={classes.select}
                                  value={decision.answer}
                                  onChange={(event) =>
                                    handleMeasurementValueSelect(event, key)
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {
                                        "& .MuiMenuItem-root": {
                                          borderRadius: 2,

                                          fontSize: 12,
                                          fontFamily: "montserrat",
                                          fontWeight: 900,
                                        },
                                        "& .MuiList-padding": {
                                          minWidth: "100%",
                                        },
                                      },
                                      style: {
                                        padding: "15px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      },
                                    },
                                  }}
                                  input={
                                    <OutlinedInput
                                      sx={{ fontSize: 12 }}
                                      label=""
                                    />
                                  }
                                >
                                  {decision.options.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option}
                                        value={option}
                                        style={{ justifyContent: "center" }}
                                      >
                                        {option}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              )}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>

                      <Grid item className={classes.grid_decision_item}>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <Grid
                            item
                            xs={6}
                            className={classes.grid_measurement_qa}
                          >
                            <Grid
                              container
                              spacing={2}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-start"
                              className={classes.item_container}
                            >
                              <Grid item className={classes.grid_label}>
                                <Typography className={classes.question}>
                                  {decisionTree[previousDecision].answer}
                                </Typography>
                              </Grid>

                              <Grid item className={classes.grid_label}>
                                {
                                  <TextField
                                    key={`TextField_value${key}`}
                                    id="outlined-number"
                                    label=""
                                    type={
                                      decisionTree[previousDecision]?.answer ===
                                        "Start Airport ID" ||
                                      decisionTree[previousDecision]?.answer ===
                                        "End Airport ID"
                                        ? "text"
                                        : "number"
                                    }
                                    style={{ width: "100%", height: "100%" }}
                                    onChange={(event) => {
                                      handleMeasurementValueChange(event, key);
                                    }}
                                    defaultValue={defaultValue}
                                    value={decision.value}
                                    sx={{
                                      width: "100%",
                                      input: {
                                        fontSize: 12,
                                        fontFamily: "montserrat",
                                        fontWeight: 900,
                                      },
                                      label: {
                                        fontSize: 12,
                                        fontFamily: "montserrat",
                                        fontWeight: 900,
                                      },
                                    }}
                                  />
                                }
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={6}
                            className={classes.grid_measurement_qa}
                          >
                            <Grid
                              container
                              spacing={2}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-start"
                              className={classes.item_container}
                            >
                              <Grid item className={classes.grid_label}>
                                <Typography
                                  className={classes.question}
                                  style={{
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {`Measurement Unit`}
                                </Typography>
                              </Grid>

                              <Grid item className={classes.grid_label}>
                                <Select
                                  key={`TextField_unit${key}`}
                                  style={{
                                    width: "100%",
                                  }}
                                  value={decision.unit}
                                  onChange={(event) =>
                                    handleMeasurementUnitSelect(event, key)
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {
                                        "& .MuiMenuItem-root": {
                                          borderRadius: 2,

                                          fontSize: 12,
                                          fontFamily: "montserrat",
                                          fontWeight: 900,
                                        },
                                        "& .MuiList-padding": {
                                          minWidth: "100%",
                                        },
                                      },
                                      style: {
                                        padding: "15px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      },
                                    },
                                  }}
                                  input={
                                    <OutlinedInput
                                      sx={{
                                        fontSize: 12,
                                        fontFamily: "montserrat",
                                        fontWeight: 900,
                                      }}
                                      label=""
                                    />
                                  }
                                >
                                  {decision.allowedMeasure.map(
                                    (measurement) => {
                                      return (
                                        <MenuItem
                                          key={measurement}
                                          value={measurement}
                                          style={{ justifyContent: "center" }}
                                        >
                                          {measurement}
                                        </MenuItem>
                                      );
                                    },
                                  )}
                                </Select>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              )
            );
          })}
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: !fullScreen ? "50%" : "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          padding: "20px",
        }}
      >
        <EditRight
          singleExpense={singleExpense}
          locationAll={locationAll}
          locationAllLoading={locationAllLoading}
          handleChipClick={handleChipClick}
          calculatationResult={calculatationResult}
          handleCalculationResultChange={handleCalculationResultChange}
          calculateOpen={calculateOpen}
          handleCalculateEmissions={handleCalculateEmissions}
        />
      </Grid>
    </Grid>
  );
};

export default EditMiddle;
