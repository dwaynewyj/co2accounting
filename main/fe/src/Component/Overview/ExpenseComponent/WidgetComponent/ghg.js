import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Grid, Fade, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
const Ghg = ({ categoryRank, payeeRank }) => {
  const [filter, setFilter] = useState(false); // true - sector , false - payee
  const [max, setMax] = useState(false);

  useEffect(() => {
    const maxValue = filter ? categoryRank[0].sum : payeeRank[0].sum;
    setMax(maxValue);
  }, [categoryRank, payeeRank, filter]);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            size="md"
            sx={{
              fontWeight: 900,
              color: "#A2A2A2",
              paddingLeft: "20px",
            }}
          >
            GHG Breakdown
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 900,
              color: "#467EC7",
              padding: "20px",
            }}
          >{`GHG per ${!filter ? "Sector" : "Payee"}`}</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "20px",
          }}
        >
          <Grid
            item
            onClick={() => setFilter(false)}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",

              "&:hover": {
                cursor: "pointer",
                opacity: 0.8,

                borderBottom: " 2px solid #467EC7",
                borderBottomLeftRadius: " 10px",
                borderBottomRightRadius: " 10px",
              },
              borderBottom: !filter && "2px solid #467EC7",
              borderBottomLeftRadius: !filter && "10px",
              borderBottomRightRadius: !filter && "10px",
            }}
          >
            <Typography
              size="md"
              sx={{
                fontWeight: 900,
                color: !filter ? "#467EC7" : "#A2A2A2",
              }}
            >
              Sector
            </Typography>
          </Grid>
          <Grid
            item
            onClick={() => setFilter(true)}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderBottom: filter && "2px solid #467EC7",
              borderBottomLeftRadius: filter && "10px",
              borderBottomRightRadius: filter && "10px",
            }}
          >
            <Typography
              size="md"
              sx={{
                fontWeight: 900,
                color: !filter ? "#467EC7" : "#A2A2A2",
              }}
            >
              Payee
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "30px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "50px",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          {(filter ? payeeRank : categoryRank).map((elem, index) => {
            let key = !filter ? "category" : "payee";
            let percentage = (elem.sum / max) * 100;
            return (
              <>
                <Fade
                  key={`ghg_${elem[key]}_${index}`}
                  in={true}
                  timeout={1000}
                >
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
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: "10px",
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
                          size="sm"
                          sx={{
                            fontWeight: 900,
                            color: "#A2A2A2",
                            paddingLeft: "20px",
                          }}
                        >
                          {elem[key]}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            background:
                              "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box",
                            borderRadius: "100px",
                            width: percentage < 0 ? "0px" : `${percentage}%`,
                          }}
                        >
                          <Typography
                            size="sm"
                            sx={{
                              fontWeight: 900,
                              paddingLeft: "20px",
                              color: percentage < 25 ? "#AFAFAF" : "white",
                            }}
                          >
                            {elem.sum.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Fade>
                <Grid
                  item
                  style={{
                    width: "100%",
                    height: "10px",
                  }}
                >
                  <Divider />
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

// <LinearProgressWithLabel value={elem.sum} />

export default Ghg;
