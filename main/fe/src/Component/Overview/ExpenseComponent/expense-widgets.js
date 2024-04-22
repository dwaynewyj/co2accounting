import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Fade, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Assurance from "./WidgetComponent/assurance.js";
import EditLocation from "./WidgetComponent/edit-location.js";
import { Scope, ScopeEmpty } from "./WidgetComponent/ScopeDoughnut";
import Ghg from "./WidgetComponent/ghg.js";
import Threshold from "./WidgetComponent/threshold.js";
import GhgEmpty from "./WidgetComponent/ghg-empty.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

const ExpenseWidgets = ({
  client,
  expenses,
  location,
  year,
  setUpdated,
  setOverview,
  setExpenseUpdated,
  setExpenseReset,
  setGlobalExpense,
  setGlobalLocation,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  let dashboardData = {};

  const [dashboard, setDashboard] = useState({});
  const [cO2ePercentage, setCO2ePercentage] = useState(0);

  const [maxInventoryIndex, setMaxInventoryIndex] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);

  const initWidget = () => {
    for (
      let loopYear = parseInt(year, 10);
      loopYear > parseInt(year, 10) - 3;
      loopYear--
    ) {
      if (location) {
        let data = {
          ledger_name: `${location._id}_${loopYear}`,
          sort_by: "AMOUNT",
          sort_order: 1,
          qty_records: 1000,
          page_num: 1,
        };
        let expenseDataLength = 0;

        const fetchExpenseData = async () => {
          try {
            const scopeUrl = `/expense/dashboard/scope`;
            const ghgUrl = `/expense/dashboard/ghg`;
            const assuranceUrl = `/expense/dashboard/assurance`;
            const thresholdUrl = `/expense/dashboard/threshold`;

            const [
              scopeResponse,
              ghgResponse,
              assuranceResponse,
              thresholdResponse,
            ] = await Promise.all([
              axiosBaseInstance.get(scopeUrl, { params: data }),
              axiosBaseInstance.get(ghgUrl, { params: data }),
              axiosBaseInstance.get(assuranceUrl, { params: data }),
              axiosBaseInstance.get(thresholdUrl, { params: data }),
            ]);

            if (scopeResponse.data?.scope?.expensesNum !== expenseDataLength) {
              expenseDataLength = scopeResponse.data?.scope?.expensesNum;
              setExpensesData(scopeResponse.data?.scope?.expensesNum);
              fetchExpenseData();
            }

            const inventory_sum = assuranceResponse.data?.assurance?.inventory;
            const confidence = assuranceResponse.data?.assurance?.confidence;
            const completion =
              assuranceResponse.data?.assurance?.completion > 0
                ? (assuranceResponse.data?.assurance?.completion /
                    expenses?.length) *
                  100
                : 0;
            const payeeRank = ghgResponse.data?.ghg?.payeeRank;
            const categoryRank = ghgResponse.data?.ghg?.categoryRank;
            const scopeRank = scopeResponse.data?.scope?.scopeRank;
            const thresholdData = thresholdResponse.data?.threshold?.threshold;

            dashboardManager(
              loopYear,
              inventory_sum,
              confidence,
              completion,
              payeeRank,
              categoryRank,
              scopeRank,
              thresholdData,
            );

            let inventory = Object.entries(dashboardData).map(([key, val]) => {
              // return val.inventory;
              return Math.abs(val.inventory);
            });

            setMaxInventoryIndex(inventory.indexOf(Math.max(...inventory)));
            setInventoryData(inventory);
            setDashboard(dashboardData);
          } catch (error) {
            console.error("Error occurred:", error);
          }
        };
        fetchExpenseData();
      }
    }
  };

  const dashboardManager = (
    loopYear,
    inventory_sum,
    confidence,
    completion,
    payeeRank,
    categoryRank,
    scopeRank,
    thresholdData,
  ) => {
    dashboardData[loopYear] = {
      inventory: inventory_sum,
      confidence: confidence,
      completion: completion,
      payee_rank: payeeRank,
      category_rank: categoryRank,
      scope_rank: scopeRank,
      threshold_data: thresholdData,
    };
    if (
      dashboardData[year] &&
      dashboardData[(parseInt(year, 10) - 1).toString()]
    ) {
      let percentage = (
        (dashboardData[year].inventory -
          dashboardData[(parseInt(year, 10) - 1).toString()].inventory) /
        (dashboardData[(parseInt(year, 10) - 1).toString()].inventory === 0
          ? 1
          : dashboardData[(parseInt(year, 10) - 1).toString()].inventory) /
        100
      ).toFixed(2);

      percentage = !isNaN(percentage) ? (percentage / 1000).toFixed(2) : 0;
      setCO2ePercentage(percentage);
    }
  };

  useEffect(() => {
    initWidget();
  }, [expenses, location, year]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      style={{
        width: "100%",
        height: "100%",
        flexWrap: "nowrap",

        height: "100%",
        alignItems: "stretch",
        gap: 20,
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",

          flexGrow: 1,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          style={{
            width: "100%",
            height: "100%",
            flexWrap: fullScreen ? "wrap" : "nowrap",

            height: "100%",
            alignItems: "stretch",
            gap: 20,
          }}
        >
          <Grid
            item
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",

              flexGrow: 1,
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",

                flexGrow: 1,

                background: "white",
                boxShadow: "0px 21px 99px #00000014",
                borderRadius: 20,
                padding: "20px",
              }}
            >
              {dashboard[year]?.scope_rank?.length > 0 ? (
                <Scope scopeRank={dashboard[year].scope_rank} />
              ) : (
                <ScopeEmpty />
              )}
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",

              flexGrow: 1,
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",

                flexGrow: 1,

                background: "white",
                boxShadow: "0px 21px 99px #00000014",
                borderRadius: 20,
                padding: "20px",
              }}
            >
              {dashboard[year]?.category_rank &&
              dashboard[year]?.payee_rank &&
              (dashboard[year]?.category_rank?.length > 0 ||
                dashboard[year]?.payee_rank?.length > 0) ? (
                <Ghg
                  categoryRank={dashboard[year]?.category_rank}
                  payeeRank={dashboard[year]?.payee_rank}
                />
              ) : (
                <GhgEmpty />
              )}
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexGrow: 1,
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
                height: "100%",
                flexWrap: "nowrap",
                gap: 20,
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "stretch",
                  alignItems: "stretch",
                  flexGrow: 1,
                }}
              >
                {client && location ? (
                  <Fade
                    in={Object.values(dashboard).length > 0}
                    timeout={2000}
                    key={"edit_location"}
                    style={{
                      flexGrow: 1,
                    }}
                  >
                    <div>
                      <EditLocation
                        client={client}
                        location={location}
                        year={year}
                        setUpdated={setUpdated}
                        setOverview={setOverview}
                        setExpenseUpdated={setExpenseUpdated}
                        setExpenseReset={setExpenseReset}
                        setGlobalExpense={setGlobalExpense}
                        setGlobalLocation={setGlobalLocation}
                      />
                    </div>
                  </Fade>
                ) : (
                  <CircularProgress />
                )}
              </Grid>

              <Grid
                item
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {Object.values(dashboard).length ? (
                  <Assurance dashboard={dashboard} year={year} />
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* threshold 
      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",

          flexGrow: 1,
        }}
      >
        <Grid
          item
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",

            flexGrow: 1,

            background: "white",
            boxShadow: "0px 21px 99px #00000014",
            borderRadius: 20,
            padding: "20px",
          }}
        >
          {dashboard[year]?.category_rank &&
          dashboard[year]?.payee_rank &&
          dashboard[year]?.threshold_data?.length > 0 ? (
            <Threshold data={dashboard[year]?.threshold_data} />
          ) : (
            <GhgEmpty />
          )}
        </Grid>
      </Grid>
      */}
    </Grid>
  );
};

ExpenseWidgets.propTypes = {
  client: PropTypes.object.isRequired,
  expenses: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([undefined])])
    .isRequired,
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setUpdated: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  setGlobalExpense: PropTypes.func.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
};

export default ExpenseWidgets;
