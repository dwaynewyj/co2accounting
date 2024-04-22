import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Chip, TextField, IconButton } from "@mui/material";
import { REPORT_YEARS } from "../../Overview/constant.js";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import EventIcon from "@mui/icons-material/Event";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const ReportDate = ({ report, setReport }) => {
  const handleYearClick = (chip) => {
    setReport({ ...report, year: chip });
  };

  const handleBaseYearClick = (chip) => {
    setReport({ ...report, base_year: chip });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Grid
          item
          sx={{
            width: "100%", //====================================================================== Custom Select
          }}
        >
          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <Grid
              item
              xs
              variant="inv-report-card"
              sx={{
                background:
                  !report.custom_range &&
                  "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
              }}
              onClick={() => {
                setReport((prev) => {
                  return {
                    ...prev,
                    custom_range: false,
                    base_year: null,
                    year: null,
                  };
                });
              }}
            >
              <EventIcon
                className="hover-child"
                sx={{
                  color: report.custom_range ? "#9A9A9A" : "white",
                }}
              />
              <Typography
                className="hover-child"
                size="md"
                sx={{
                  fontWeight: 600,
                  color: report.custom_range ? "#404040" : "white",
                }}
              >
                Calendar Year
              </Typography>
            </Grid>

            <Grid
              item
              xs
              variant="inv-report-card"
              sx={{
                background:
                  report.custom_range &&
                  "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
              }}
              onClick={() => {
                setReport((prev) => {
                  return {
                    ...prev,
                    custom_range: true,
                    base_year: null,
                    year: null,
                  };
                });
              }}
            >
              <EditCalendarIcon
                className="hover-child"
                sx={{
                  color: !report.custom_range ? "#9A9A9A" : "white",
                }}
              />
              <Typography
                className="hover-child"
                size="md"
                sx={{
                  fontWeight: 600,
                  color: !report.custom_range ? "#404040" : "white",
                }}
              >
                Custom
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            width: "100%", //====================================================================== Year
          }}
        >
          <Typography
            size="md"
            sx={{
              fontWeight: 800,
              color: "#404040",
            }}
          >
            Select Reporting Year
          </Typography>
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          {report.custom_range ? (
            <Grid container alignItems="start" gap={1}>
              <Grid item>
                <DesktopDatePicker
                  sx={{
                    width: "100%",
                    "& .MuiIconButton-root:focus": {
                      outline: 0,
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D9D9D9 !important",
                    },
                  }}
                  inputFormat="MM/DD/YYYY"
                  label="Start"
                  value={report?.custom_date_start}
                  openTo="year"
                  onAccept={(newValue) => {
                    setReport({
                      ...report,
                      custom_date_start: newValue,
                      custom_date_end: null,
                      year: null,
                    });
                  }}
                  renderInput={(startProps) => (
                    <React.Fragment>
                      <TextField
                        {...startProps}
                        sx={{
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
                  maxDate={dayjs()}
                />
              </Grid>
              <Grid item>
                <DesktopDatePicker
                  sx={{
                    width: "100%",
                    "& .MuiIconButton-root:focus": {
                      outline: 0,
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D9D9D9 !important",
                    },
                  }}
                  disabled={!report.custom_date_start}
                  inputFormat="MM/DD/YYYY"
                  label="End"
                  value={report?.custom_date_end}
                  openTo="year"
                  onAccept={(newValue) => {
                    setReport({
                      ...report,
                      custom_date_end: newValue,
                      year: newValue.year(),
                    });
                  }}
                  renderInput={(startProps) => (
                    <React.Fragment>
                      <TextField
                        {...startProps}
                        sx={{
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
                  minDate={report?.custom_date_start}
                  maxDate={dayjs()}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
                height: "100%",
                gap: 1.25,
              }}
            >
              {REPORT_YEARS.map((chip) => {
                return (
                  <Grid
                    item
                    xs
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Chip
                      key={chip}
                      label={
                        <Typography
                          size="sm"
                          sx={{
                            fontWeight: 900,
                            color:
                              chip === report?.year
                                ? "white"
                                : "rgba(154, 154, 154, 1)",
                          }}
                        >
                          {chip}
                        </Typography>
                      }
                      clickable
                      sx={{
                        width: "100%",
                        padding: 2.5,
                        background:
                          chip === report?.year
                            ? "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box"
                            : "transparent",

                        border: "1px solid #D9D9D9",
                        borderRadius: 2,
                      }}
                      variant={chip === report?.year ? "default" : "outlined"}
                      onClick={() => handleYearClick(chip)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>

        <Grid
          item
          sx={{
            width: "100%", //====================================================================== Base Year
          }}
        >
          <Typography
            size="md"
            sx={{
              fontWeight: 800,
              color: "#404040",
            }}
          >
            Select Reporting Base Year
          </Typography>
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              gap: 1.25,
            }}
          >
            {report.custom_range ? (
              <Grid container alignItems="start" gap={1}>
                <Grid item>
                  <DesktopDatePicker
                    sx={{
                      width: "100%",
                      "& .MuiIconButton-root:focus": {
                        outline: 0,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D9D9D9 !important",
                      },
                    }}
                    inputFormat="MM/DD/YYYY"
                    label="Start"
                    openTo="year"
                    value={report.custom_base_date_start}
                    onAccept={(newValue) => {
                      setReport({
                        ...report,
                        custom_base_date_start: newValue,
                        custom_base_date_end: null,
                        base_year: null,
                      });
                    }}
                    renderInput={(startProps) => (
                      <React.Fragment>
                        <TextField
                          {...startProps}
                          sx={{
                            input: {
                              fontSize: 12,
                              fontFamily: "montserrat",
                            },
                            label: {
                              fontSize: 12,
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
                    maxDate={dayjs()}
                  />
                </Grid>
                <Grid item>
                  <DesktopDatePicker
                    sx={{
                      width: "100%",
                      "& .MuiIconButton-root:focus": {
                        outline: 0,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D9D9D9 !important",
                      },
                    }}
                    disabled={!report.custom_base_date_start}
                    inputFormat="MM/DD/YYYY"
                    label="End"
                    value={report.custom_base_date_end}
                    openTo="year"
                    onAccept={(newValue) => {
                      setReport({
                        ...report,
                        custom_base_date_end: newValue,
                        base_year: newValue.year(),
                      });
                    }}
                    renderInput={(startProps) => (
                      <React.Fragment>
                        <TextField
                          {...startProps}
                          sx={{
                            input: {
                              fontSize: 12,
                              fontFamily: "montserrat",
                            },
                            label: {
                              fontSize: 12,
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
                    minDate={report?.custom_base_date_start}
                    maxDate={dayjs()}
                  />
                </Grid>
              </Grid>
            ) : (
              REPORT_YEARS.map((chip) => {
                return (
                  <Grid
                    item
                    xs
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Chip
                      key={chip}
                      label={
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color:
                              chip === report?.base_year
                                ? "white"
                                : "rgba(154, 154, 154, 1)",
                          }}
                        >
                          {chip}
                        </Typography>
                      }
                      clickable
                      sx={{
                        width: "100%",
                        padding: 2.5,
                        background:
                          chip === report?.base_year
                            ? "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box"
                            : "transparent",

                        border: "1px solid #D9D9D9",
                        borderRadius: 2,
                      }}
                      variant={
                        chip === report?.base_year ? "default" : "outlined"
                      }
                      onClick={() => handleBaseYearClick(chip)}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

ReportDate.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportDate;
