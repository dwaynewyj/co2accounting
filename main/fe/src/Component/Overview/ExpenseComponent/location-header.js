import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAuth0 } from "@auth0/auth0-react";
import ArticleIcon from "@mui/icons-material/Article";
import CreateExpense from "./create-expense.js";
import Reports from "./reports.js";
import ImportExpenseButton from "./SharedComponent/import-expense-button.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_header: {
    width: "100%",
    height: "100%",
  },
  grid_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  },
  grid_num_locations: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    gap: 20,
  },
  grid_create_expense: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px",
    gap: 10,
  },
}));

const LocationHeader = ({
  client,
  location,
  year,
  expenses,
  filteredExpenses,
  setExpenseUpdated,
  setGlobalExpense,
  uploadOpen,
  setUploadOpen,
}) => {
  const classes = useStyles();
  const navigate = useNavigate({});
  const { user } = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const [reportOpen, setReportOpen] = useState(false);

  const handleGenerateReport = () => {
    setIsLoading(true);
    const generateReport = async () => {
      try {
        const response = await axiosBaseInstance.post(
          "/report",
          {},
          {
            params: {
              client_loc_id: location._id,
              client_org_name: client.client_org_data.client_org_name,
              year: year,
            },
            responseType: "blob",
          },
        );
        setIsLoading(false);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "summary-report.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    generateReport();
  };

  const fetchReport = (id) => {
    const fetchReportData = async () => {
      try {
        const response = await axiosBaseInstance.get("/report", {
          params: {
            user_id: user.sub,
            client_loc_id: location._id,
            qty_records: 10,
            page_num: 1,
            year: year,
          },
        });
        setReports(response?.data?.reports);
        setIsLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchReportData();
  };

  useEffect(() => {
    fetchReport();
  }, [client, location, year]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_header}
    >
      <CreateExpense
        client={client}
        location={location}
        year={year}
        open={uploadOpen}
        setOpen={setUploadOpen}
        setExpenseUpdated={setExpenseUpdated}
      />

      <Reports
        reports={reports}
        location={location}
        open={reportOpen}
        setOpen={setReportOpen}
      />
      <Grid item xs className={classes.grid_title}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_header}
        >
          <Grid
            item
            xs={8}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography variant="title" size="lg">
              {location.client_loc_data.client_loc_name}{" "}
              <Typography variant="title-secondary" size="lg">
                {year} Expenses
              </Typography>
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Fade in={reports?.pdfRecords?.length > 0} timeout={1000}>
              <Button
                sx={{
                  borderRadius: 100,
                  border: "none",
                  height: "100%",
                  minWidth: "250px",
                  border: "none",
                  background: "#F9F9F9",
                  color: "#404040",
                  ":hover": {
                    opacity: 0.7,
                    border: "2px solid #D9D9D9",
                    background: "white",
                  },

                  ":disabled": {
                    background: "grey",
                  },

                  fontSize: "12px !important",
                  fontFamily: "montserrat",
                  fontWeight: 900,
                  textWrap: "nowrap",
                  paddingLeft: 3,
                  paddingRight: 3,
                  textTransform: "none",

                  "& .MuiButton-endIcon": {
                    color: "#404040",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    scale: "1.3",
                  },
                }}
                endIcon={
                  <ArticleIcon
                    style={{
                      fontSize: 20,
                      color: "white",
                      background:
                        "linear-gradient(225deg, #4699CF 0%, #4673C4 100%)",
                      borderRadius: "50%",
                      padding: 5,
                    }}
                  />
                }
                onClick={() => setReportOpen(true)}
              >
                View Reports
              </Button>
            </Fade>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid item xs>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs className={classes.grid_num_locations}>
                <Typography size="md" variant="counter">{`${
                  expenses?.length ?? 0
                }`}</Typography>
                <Typography variant="subtitle" size="md">
                  Total Imported Expenses
                </Typography>
              </Grid>

              <Grid item xs className={classes.grid_create_expense}>
                <ImportExpenseButton
                  primary={expenses?.length <= 0}
                  action={() => setUploadOpen(true)}
                />
                {expenses?.length > 0 && (
                  <Button
                    size="md"
                    disabled={isLoading}
                    endIcon={<AssessmentIcon />}
                    onClick={handleGenerateReport}
                  >
                    {isLoading
                      ? `Generating In Progress ...`
                      : `Generate Report`}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

LocationHeader.propTypes = {
  client: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expenses: PropTypes.array,
  setExpenseUpdated: PropTypes.func.isRequired,
  setUploadOpen: PropTypes.func.isRequired,
};

export default LocationHeader;
