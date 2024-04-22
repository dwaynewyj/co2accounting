import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import report_location_icon from "../assets/report-location.svg";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const ReportForm = ({ report, setReport, setTab }) => {
  useEffect(() => {}, [report]);

  const cancelReport = () => {
    setReport({ options: [] });
    setTab(0);
  };

  const [generating, setGenerating] = useState(false);

  const generateReport = () => {
    setGenerating(true);
    console.log("Generating inventory report:", report);
    let report_data = {
      client_name: report.client.client_org_data.client_org_name,
      client_loc_id: report.location._id,
      ...report.location.client_loc_data,
      business_goals: report.business_goals,
      consolidation_approach: report.consolidation_approach,
      calculation_method: report.calculation_method,
      reporting_year: report.year,
      base_year: report.base_year,
      custom_range: report.custom_range,
      ...(report.custom_range && {
        reporting_range: [
          dayjs(report.custom_date_start).format("Do MMMM YYYY"),
          dayjs(report.custom_date_end).format("Do MMMM YYYY"),
        ],
        base_range: [
          dayjs(report.custom_base_date_start).format("Do MMMM YYYY"),
          dayjs(report.custom_base_date_end).format("Do MMMM YYYY"),
        ],
      }),
      includes: Object.keys(report.options).filter(
        (key) => report.options[key] === true,
      ),
    };

    const generateInventoryReport = async () => {
      try {
        const response = await axiosBaseInstance.post(
          "/report/inventory",
          report_data,
          { responseType: "blob" },
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "inventory-report.pdf");
        document.body.appendChild(link);
        link.click();
        setGenerating(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    generateInventoryReport();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{
        gap: 10,
      }}
    >
      <Grid
        item
        style={{
          borderRadius: 10,
          background: "#FFF",
          boxShadow: "0px 4px 31px 1px rgba(0, 0, 0, 0.11)",
          width: 416,
          height: 622,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          style={{
            gap: 10,
            height: "100%",
            position: "relative",
          }}
        >
          <Grid item style={{ padding: 10 }}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              style={{
                width: "100%",
                gap: 10,
              }}
            >
              {report.location ? (
                <Fade
                  key={report.location?.location_loc_data?.location_loc_name}
                  in={report.location}
                  timeout={1000}
                >
                  <img
                    style={{ width: 63, height: 63 }}
                    src={report_location_icon}
                    alt={report_location_icon}
                  />
                </Fade>
              ) : (
                <Grid
                  item
                  style={{
                    width: 63,
                    height: 63,
                    borderRadius: 10,
                    background: "#F6F6F6",
                  }}
                ></Grid>
              )}

              <Grid item style={{}}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    gap: 5,
                  }}
                >
                  {report.client?.client_org_data ? (
                    <Fade
                      key={report.client?.client_org_data?.client_org_name}
                      in={report.client}
                      timeout={1000}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontFamily: "montserrat",
                          fontWeight: 600,
                          color: "#404040",
                        }}
                      >
                        {report.client?.client_org_data?.client_org_name}
                      </Typography>
                    </Fade>
                  ) : (
                    <Grid
                      item
                      style={{
                        width: 300,
                        height: 27,
                        borderRadius: 10,
                        background: "#F6F6F6",
                      }}
                    ></Grid>
                  )}

                  <Grid item style={{}}>
                    {report.location ? (
                      <Fade
                        key={report.location?.client_loc_data?.client_loc_name}
                        in={report.location}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "24px",
                            fontFamily: "montserrat",
                            fontWeight: 700,
                            color: "#404040",

                            background:
                              "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
                            backgroundClip: "text",
                            "-webkit-background-clip": "text",
                            "-webkit-text-fill-color": "transparent",
                          }}
                        >
                          {report.location?.client_loc_data?.client_loc_name}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 300,
                          height: 37,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            style={{
              width: 416, //========================================================================================
            }}
            flexItem
          />
          <Grid
            item
            style={{
              width: "100%",
              padding: 20,
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              style={{
                gap: 5,
                width: "100%",
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Year`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.year ? (
                      <Fade key={report.year} in={report.year} timeout={1000}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.year}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Base Year`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.base_year ? (
                      <Fade
                        key={report.base_year}
                        in={report.base_year}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.base_year}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Details`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.location ? (
                      <Fade
                        key={
                          report.location?.client_loc_data?.client_loc_address
                        }
                        in={report.location}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.location?.client_loc_data?.client_loc_address}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}></Grid>
                  <Grid item style={{}} xs={6}>
                    {report.location ? (
                      <Fade
                        key={
                          report.location?.client_loc_data
                            ?.client_loc_phoneNumber
                        }
                        in={report.location}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {
                            report.location?.client_loc_data
                              ?.client_loc_phoneNumber
                          }
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            style={{
              width: 416, //========================================================================================
            }}
            flexItem
          />
          <Grid
            item
            style={{
              width: "100%",
              padding: 20,
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              style={{
                gap: 5,
                width: "100%",
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Business Goal`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.business_goals_text ? (
                      <Fade
                        key={report.business_goals_text}
                        in={report.business_goals_text}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.business_goals_text}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Consolidation Approach`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.consolidation_approach_text ? (
                      <Fade
                        key={report.consolidation_approach_text}
                        in={report.consolidation_approach_text}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.consolidation_approach_text}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid item style={{}} xs={6}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        color: "#9C9C9C",
                      }}
                    >
                      {`Calculation Method`}
                    </Typography>
                  </Grid>
                  <Grid item style={{}} xs={6}>
                    {report.calculation_method_text ? (
                      <Fade
                        key={report.calculation_method_text}
                        in={report.calculation_method_text}
                        timeout={1000}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            fontWeight: 600,
                            color: "#404040",
                          }}
                        >
                          {report.calculation_method_text}
                        </Typography>
                      </Fade>
                    ) : (
                      <Grid
                        item
                        style={{
                          width: 178,
                          height: 15,
                          borderRadius: 10,
                          background: "#F6F6F6",
                        }}
                      ></Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            style={{
              width: 416, //========================================================================================
            }}
            flexItem
          />
          <Grid
            item
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              style={{
                width: "100%",
                gap: 5,
              }}
            >
              <Grid item style={{}}>
                <Typography
                  style={{
                    fontSize: "12px",
                    fontFamily: "montserrat",
                    fontWeight: 600,
                    color: "#9C9C9C",
                  }}
                >
                  Includes
                </Typography>
              </Grid>

              <Grid item style={{}}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  style={{
                    width: "100%",
                    gap: 5,
                  }}
                >
                  {Object.keys(report?.options).filter(
                    (key) => report?.options[key],
                  ).length > 0 ? (
                    Object.entries(report?.options).map(([option, exists]) => {
                      return (
                        exists && (
                          <Fade key={option} in={option} timeout={1000}>
                            <Typography
                              style={{
                                padding: "0 5px 0 5px",
                                fontSize: "12px",
                                fontFamily: "montserrat",
                                fontWeight: 500,
                                color: "#404040",
                                borderRadius: 50,
                                border: "1px solid #D9D9D9",
                                background: "#F9F9F9",
                              }}
                            >
                              {option}
                            </Typography>
                          </Fade>
                        )
                      );
                    })
                  ) : (
                    <>
                      <Grid
                        item
                        style={{
                          width: 122,
                          height: 20,
                          borderRadius: 10,
                          background: "#F6F6F6",
                          marginBottom: 5,
                        }}
                      />
                      <Grid
                        item
                        style={{
                          width: 122,
                          height: 20,
                          borderRadius: 10,
                          background: "#F6F6F6",
                          marginBottom: 5,
                        }}
                      />
                      <Grid
                        item
                        style={{
                          width: 122,
                          height: 20,
                          borderRadius: 10,
                          background: "#F6F6F6",
                          marginBottom: 5,
                        }}
                      />
                      <Grid
                        item
                        style={{
                          width: 122,
                          height: 20,
                          borderRadius: 10,
                          background: "#F6F6F6",
                          marginBottom: 5,
                        }}
                      />
                      <Grid
                        item
                        style={{
                          width: 122,
                          height: 20,
                          borderRadius: 10,
                          background: "#F6F6F6",
                          marginBottom: 5,
                        }}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider
            style={{
              width: 416, //========================================================================================
            }}
            flexItem
          />
          <Grid
            item
            style={{
              width: "100%",
              padding: 20,
              position: "absolute",
              bottom: 0,
            }}
          >
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              style={{
                width: "100%",
                // paddingTop: 60,
              }}
            >
              <Grid item style={{}} xs={6}>
                <Typography
                  style={{
                    cursor: "pointer",
                    color: "#A1A1A1",
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 500,
                    textDecorationLine: "underline",
                  }}
                  onClick={() => cancelReport()}
                >
                  Cancel
                </Typography>
              </Grid>

              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                xs={6}
              >
                {generating ? (
                  <CircularProgress style={{ width: 20, height: 20 }} />
                ) : (
                  <Fade key={report.quick} in={true} timeout={1000}>
                    <Button
                      disabled={!report.generate}
                      sx={{
                        height: 20,
                        width: 200,
                        background:
                          " var(--29C776---099A50, linear-gradient(270deg, #29C776 0%, #099A50 100%))",
                      }}
                      endIcon={<ArrowForwardIosIcon style={{ scale: "0.7" }} />}
                      onClick={() => generateReport()}
                    >
                      {report.quick ? `Quick Report` : `Comprehensive Report`}
                    </Button>
                  </Fade>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item style={{}}>
        <Divider
          style={{
            width: 416, //========================================================================================
          }}
          flexItem
        />
      </Grid>
      <Grid item>
        <Typography size="sm" sx={{ fontWeight: 900 }}>
          Not sure where to start? Visit our{" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://www.climateaccounting.com/help-center/getting-started-with-scop3 "
            target="_blank"
            rel="noreferrer"
          >
            Help Center
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

ReportForm.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
};

export default ReportForm;
