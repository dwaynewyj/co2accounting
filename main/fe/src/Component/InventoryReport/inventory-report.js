import React, { useEffect, useState, useRef } from "react";
import { Grid, Fade } from "@mui/material";

import ReportHeader from "./Components/report-header.js";
import ReportClient from "./Components/report-client.js";
import ReportLocation from "./Components/report-location.js";
import ReportForm from "./Components/report-form.js";
import ReportMain from "./Components/report-main.js";
import ReportDate from "./Components/report-date.js";
import ReportType from "./Components/report-type.js";
import ReportGoal from "./Components/report-goal.js";
import ReportConsolidation from "./Components/report-consolidation.js";
import ReportCalculation from "./Components/report-calculation.js";
import ReportInclude from "./Components/report-include.js";

const InventoryReport = ({ customer, clients }) => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const [report, setReport] = useState({ options: [] });
  const [reportStep, setReportStep] = useState(0);

  const INVENTORY_ACCOUNT_STEPS = [
    //================================================================================ Account Tab
    {
      tab: 0,
      step: 1,
      condition: true,
      fade_condition: true,
      title: `Which client are you generating report for?`,
      component: (
        <ReportClient
          report={{
            ...report,
            location: null,
            year: null,
            base_year: null,
            quick: false,
            business_goals: null,
            business_goals_text: null,
            consolidation_approach: null,
            consolidation_approach_text: null,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
          clients={clients}
        />
      ),
    },
    {
      tab: 0,
      step: 2,
      condition: report?.client,
      fade_condition: report?.client?.client_org_data?.client_org_name,
      title: `Select the reporting account`,
      component: (
        <ReportLocation
          report={{
            ...report,
            year: null,
            base_year: null,
            custom_range: false,
            quick: false,
            business_goals: null,
            business_goals_text: null,
            consolidation_approach: null,
            consolidation_approach_text: null,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
          locations={report?.client?.locations ?? []}
        />
      ),
    },

    {
      tab: 0,
      step: 3,
      condition: report?.location,
      fade_condition: report?.location?.client_loc_data?.client_loc_name,
      title: `Determine Reporting Period`,
      component: (
        <ReportDate
          report={{
            ...report,
            quick: false,
            business_goals: null,
            business_goals_text: null,
            consolidation_approach: null,
            consolidation_approach_text: null,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
        />
      ),
    },
    //================================================================================ Detail Tab
    {
      tab: 1,
      step: 4,
      condition:
        (!report?.custom_range && report?.year && report?.base_year) ||
        (report?.custom_range &&
          report?.custom_date_end &&
          report?.custom_base_date_end),
      fade_condition: report?.year,
      title: `What type of report would you like to create?`,

      component: (
        <ReportType
          report={{
            ...report,
            business_goals: null,
            business_goals_text: null,
            consolidation_approach: null,
            consolidation_approach_text: null,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
        />
      ),
    },

    {
      tab: 1,
      step: 5,
      condition: !report?.quick,
      fade_condition: `${report?.year}_${report?.base_year}`,
      title: `What are your business goals?`,
      component: (
        <ReportGoal
          report={{
            ...report,
            consolidation_approach: null,
            consolidation_approach_text: null,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
        />
      ),
    },

    {
      tab: 1,
      step: 6,
      condition: report?.business_goals,
      fade_condition: report?.business_goals,
      title: `Describe your Consolidation Approach`,
      component: (
        <ReportConsolidation
          report={{
            ...report,
            calculation_method: null,
            calculation_method_text: null,
            options: [],
          }}
          setReport={setReport}
        />
      ),
    },

    {
      tab: 1,
      step: 7,
      condition: report?.consolidation_approach,
      fade_condition: report?.consolidation_approach,
      title: `What method of GHG emissions Data calculations is used`,
      component: (
        <ReportCalculation
          report={{
            ...report,
            options: [],
          }}
          setReport={setReport}
        />
      ),
    },

    //================================================================================ Finalize Tab
    {
      tab: 2,
      step: 8,
      condition: report?.calculation_method,
      fade_condition: report?.calculation_method,
      title: `What would you like to include?`,

      component: <ReportInclude report={report} setReport={setReport} />,
    },
  ];

  useEffect(() => {
    setReport(report);
    scrollToBottom();
    console.log("report:", report);

    // Go to Details tab
    if (report.client && report.location && report.base_year && report.year) {
      setTab(1);
    }

    // Go to Finalize tab
    if (
      report.business_goals &&
      report.consolidation_approach &&
      report.calculation_method
    ) {
      setTab(2);
    }
  }, [report]);

  const componentRef = useRef(null);

  const scrollToBottom = () => {
    if (componentRef.current) {
      const component = componentRef.current;
      component.scrollTop = component.scrollHeight;
    }
  };

  return (
    <Fade in={true} timeout={1000}>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Grid
          item
          xs
          style={{
            width: "100%",
          }}
        >
          <ReportHeader tab={tab} handleTabChange={handleTabChange} />
        </Grid>

        <Grid
          item
          xs
          style={{
            width: "100%",
            padding: 20,
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
            <Grid
              item
              xs
              style={{
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                style={{
                  maxHeight: "70vh",
                  width: "100%",
                  gap: 30,
                  overflowY: "scroll",
                  flexWrap: "nowrap",
                  padding: 10,
                }}
              >
                {INVENTORY_ACCOUNT_STEPS.map((step, index) => {
                  return (
                    step.condition &&
                    tab === step.tab && (
                      <Fade
                        key={step.fade_condition}
                        in={step.fade_condition}
                        timeout={2000}
                      >
                        <Grid
                          item
                          xs
                          style={{
                            width: "100%",
                          }}
                        >
                          <ReportMain
                            step={reportStep}
                            title={step.title}
                            component={step.component}
                          />
                        </Grid>
                      </Fade>
                    )
                  );
                })}
              </Grid>
            </Grid>

            <Grid
              item
              xs
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "flex-start",
              }}
            >
              <Fade in={true} timeout={3000}>
                <div>
                  <ReportForm
                    report={report}
                    setReport={setReport}
                    setTab={setTab}
                  />
                </div>
              </Fade>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default InventoryReport;
