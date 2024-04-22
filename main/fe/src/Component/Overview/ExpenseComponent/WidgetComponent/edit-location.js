import React from "react";
import { Grid, Typography, LinearProgress, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhoneIcon from "@mui/icons-material/Phone";
import EditLocationDrawer from "./EditLocationDrawer/edit-location-drawer.js";

const EditLocation = ({
  client,
  location,
  year,
  setUpdated,
  setOverview,
  setExpenseUpdated,
  setExpenseReset,
  setGlobalExpense,
  setGlobalLocation,
}) => {
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const LinearProgressWithLabel = (props) => {
    const { value } = props;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box width="100%" sx={{ width: "100%", position: "relative", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              color: "#4690CD",
              animationDuration: "550ms",
              left: 0,
              minWidth: "100% !important",
              height: 30,
              borderRadius: 50,
            }}
          />

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
              color: "white",
              fontSize: 20,
              fontWeight: 900,
            }}
          >{`${value.toFixed(2)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "nowrap",
        background: "white",
        boxShadow: "0px 21px 99px #00000014",
        borderRadius: "20px",
      }}
    >
      <EditLocationDrawer
        drawer={drawer}
        toggleDrawer={toggleDrawer}
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

      <Grid
        item
        xs={9}
        sx={{
          width: "100%",
          padding: "40px",
          flexGrow: 1,
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            gap: "20px",
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Grid container direction="column" sx={{ gap: "10px" }}>
              <Grid
                item
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle" sx={{ fontSize: 20 }}>
                  {client?.client_org_data?.client_org_name}
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
                  }}
                >
                  {location?.client_loc_data?.client_loc_name}
                </Typography>
              </Grid>
            </Grid>
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
            <Grid
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: "15px",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TrackChangesIcon
                  sx={{
                    fontSize: 12,
                    color: "#467EC7",
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography size="sm" variant="subtitle">
                  {`${location?.threshold ?? 0} tCO2e`}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={toggleDrawer(true)}
              >
                <Typography
                  size="sm"
                  variant="subtitle"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Set Threshold
                </Typography>
              </Grid>
            </Grid>
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
            <Grid
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "15px",
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
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: "15px",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <PersonIcon
                      sx={{
                        fontSize: 16,
                        color: "#467EC7",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography size="sm" variant="subtitle">
                      {`${location?.users?.length ?? 0}`}
                    </Typography>
                  </Grid>
                </Grid>
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
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: "15px",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <LocalOfferIcon
                      sx={{
                        fontSize: 16,
                        color: "#467EC7",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography size="sm" variant="subtitle">
                      {`${location?.client_loc_data?.client_loc_country}`}
                    </Typography>
                  </Grid>
                </Grid>
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
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: "15px",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <PhoneIcon
                      sx={{
                        fontSize: 16,
                        color: "#467EC7",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography size="sm" variant="subtitle">
                      {`${location?.client_loc_data?.client_loc_phoneNumber}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        flexGrow={1}
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",

          backgroundImage: `url(/static/location-small.png)`,

          width: "100%",
          minHeight: "100%",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          transition: "opacity 1s",

          cursor: "pointer",
          opacity: 1,
          "&:hover": {
            opacity: 0.7,
          },
        }}
        onClick={toggleDrawer(true)}
      >
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "nowrap",
            padding: "20px",
            gap: "5px",
          }}
        >
          <Grid
            item
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              size="md"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 900,
                color: "white",
                textDecoration: "underline",
              }}
            >
              Edit
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                color: "white",
                fontSize: 16,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditLocation;
