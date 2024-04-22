import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Fade } from "@mui/material";

import PieChartIcon from "@mui/icons-material/PieChart";
import TuneIcon from "@mui/icons-material/Tune";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const ReportConsolidation = ({ report, setReport }) => {
  const [consolidation, setConsolidation] = useState(
    report.consolidation_approach,
  );
  const [consolidationApproach, setConsolidationApproach] = useState(
    report.consolidation_approach,
  );
  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Grid
        item
        sx={{
          width: "100%", //====================================================================== Approach
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1.25,
            flexWrap: "nowrap",
          }}
        >
          <Grid
            item
            xs
            variant="inv-report-card"
            sx={{
              background:
                consolidation === "equity_share" &&
                "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
            }}
            onClick={() => {
              setReport({
                ...report,
                consolidation_approach: "equity_share",
                consolidation_approach_text: "Equity Share",
              });
              setConsolidation("equity_share");
              setConsolidationApproach("equity_share");
            }}
          >
            <PieChartIcon
              className="hover-child"
              sx={{
                color: consolidation !== "equity_share" ? "#9A9A9A" : "white",
              }}
            />
            <Typography
              className="hover-child"
              size="md"
              sx={{
                fontWeight: 600,
                color: consolidation !== "equity_share" ? "#404040" : "white",
              }}
            >
              Equity Share Approach
            </Typography>
          </Grid>

          <Grid
            item
            xs
            variant="inv-report-card"
            sx={{
              background:
                consolidation === "control_approach" &&
                "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
            }}
            onClick={() => {
              setReport({
                ...report,
                // consolidation_approach: "control_approach",
                // consolidation_approach_text: "Control Approach",
              });
              setConsolidation("control_approach");
            }}
          >
            <TuneIcon
              className="hover-child"
              sx={{
                color:
                  consolidation !== "control_approach" ? "#9A9A9A" : "white",
              }}
            />
            <Typography
              className="hover-child"
              size="md"
              sx={{
                fontWeight: 600,
                color:
                  consolidation !== "control_approach" ? "#404040" : "white",
              }}
            >
              Control Approach
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {consolidation === "control_approach" && (
        <>
          <Fade key={consolidation} in={true} timeout={2000}>
            <Grid
              item
              sx={{
                width: "100%", //====================================================================== Control
              }}
            >
              <Typography
                size="md"
                sx={{
                  fontWeight: 800,
                  color: "#404040",
                }}
              >
                What type of control?
              </Typography>
            </Grid>
          </Fade>

          <Fade key={consolidation} in={true} timeout={2000}>
            <Grid
              item
              sx={{
                width: "100%",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1.25,
                  flexWrap: "nowrap",
                }}
              >
                <Grid
                  item
                  xs
                  variant="inv-report-card"
                  sx={{
                    background:
                      consolidationApproach === "financial_control" &&
                      "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
                  }}
                  onClick={() => {
                    setReport({
                      ...report,
                      consolidation_approach: "financial_control",
                      consolidation_approach_text: "Financial Control",
                    });
                    setConsolidationApproach("financial_control");
                  }}
                >
                  <AccountBalanceWalletIcon
                    className="hover-child"
                    sx={{
                      color:
                        consolidationApproach !== "financial_control"
                          ? "#9A9A9A"
                          : "white",
                    }}
                  />
                  <Typography
                    className="hover-child"
                    size="md"
                    sx={{
                      fontWeight: 600,
                      color:
                        consolidationApproach !== "financial_control"
                          ? "#404040"
                          : "white",
                    }}
                  >
                    Financial Control
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs
                  variant="inv-report-card"
                  sx={{
                    background:
                      consolidationApproach === "operational_control" &&
                      "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
                  }}
                  onClick={() => {
                    setReport({
                      ...report,
                      consolidation_approach: "operational_control",
                      consolidation_approach_text: "Operational Control",
                    });
                    setConsolidationApproach("operational_control");
                  }}
                >
                  <ManageAccountsIcon
                    className="hover-child"
                    sx={{
                      color:
                        consolidationApproach !== "operational_control"
                          ? "#9A9A9A"
                          : "white",
                    }}
                  />
                  <Typography
                    className="hover-child"
                    size="md"
                    sx={{
                      fontWeight: 600,
                      color:
                        consolidationApproach !== "operational_control"
                          ? "#404040"
                          : "white",
                    }}
                  >
                    Operational Control
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </>
      )}
    </Grid>
  );
};

ReportConsolidation.propTypes = {
  report: PropTypes.object.isRequired,
  setReport: PropTypes.func.isRequired,
};

export default ReportConsolidation;
