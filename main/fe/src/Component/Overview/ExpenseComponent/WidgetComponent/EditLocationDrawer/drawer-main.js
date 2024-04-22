import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
  Fade,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import AddressGoogle from "../../../../Main/Component/AddressGoogle/address-google.js";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import { axiosBaseInstance } from "../../../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_item_header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: "12px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },

  history: {
    fontSize: "12px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },

  delete_location: {
    fontSize: "12px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const DrawerMain = function DrawerMain({
  client,
  location,
  year,
  setUpdated,
  setOverview,
  setExpenseUpdated,
  setExpenseReset,
  setGlobalExpense,
  setGlobalLocation,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const currentUser = useSelector((state) => state.user);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updateLocation, setUpdateLocation] = useState(null);

  const [locationThreshold, setLocationThreshold] = useState(
    location?.threshold ?? 0,
  );
  const handleLocationThresholdChange = (event) => {
    setLocationThreshold(event.target.value);
    setUpdateLocation({ ...updateLocation, threshold: event.target.value });
  };

  const [locationName, setLocationName] = useState(
    location?.client_loc_data?.client_loc_name ?? "",
  );
  const handleLocationNameChange = (event) => {
    setLocationName(event.target.value);
    setUpdateLocation({ ...updateLocation, name: event.target.value });
  };

  const [locationPhone, setLocationPhone] = useState(
    location?.client_loc_data?.client_loc_phoneNumber ?? "",
  );
  const handleLocationPhoneChange = (event) => {
    setLocationPhone(event.target.value);
    setUpdateLocation({ ...updateLocation, phone: event.target.value });
  };

  const [address, setAddress] = useState(null);

  useEffect(() => {
    setUpdateLocation({ ...updateLocation, address: address });
  }, [address, setAddress]);

  useEffect(() => {
    fetchHistory();
  }, [location, year]);

  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    const fetchHistoryData = async () => {
      try {
        const response = await axiosBaseInstance.get("/history", {
          params: {
            client_loc_id: location._id,
            year: year,
          },
        });
        setHistory(response?.data?.history);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchHistoryData();
  };

  const handleUpdateLocation = () => {
    const fetchHistoryData = async () => {
      try {
        const response = await axiosBaseInstance.put("/location", {
          data: {
            _id: location._id,
            ...updateLocation,
            name: locationName,
            phone: locationPhone,
            threshold: locationThreshold,
          },
        });
        setGlobalLocation({ year, location: response?.data?.location });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchHistoryData();
  };

  const handleResetDatabase = () => {
    const resetDatabase = async () => {
      try {
        const response = await axiosBaseInstance.post("/location/reset", {
          _id: location._id,
          year: year,
        });
        setHistory([]);
        // setExpenseUpdated(true);
        setExpenseReset(true);
        setGlobalLocation({ year, location: response?.data?.location });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    resetDatabase();
  };

  const handleDeleteLocation = () => {
    const deleteLocation = async () => {
      try {
        const response = await axiosBaseInstance.post("/location/delete", {
          _id: location._id,
        });
        if (response?.data?.status === 1) {
          setHistory([]);
          setUpdated(true);
          setOverview(true);
          setGlobalLocation(null);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    deleteLocation();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",

          background:
            "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",

          backgroundImage: `url(/static/location-small.png)`,

          width: "100%",
          minHeight: 300,
          transition: "opacity 1s",

          cursor: "pointer",
          opacity: 1,
          padding: 50,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            gap: 5,
          }}
        >
          <Grid item className={classes.grid_item_header}>
            <Typography
              style={{
                fontSize: 12,
                fontFamily: "Montserrat",
                fontWeight: 700,
                color: "white",
              }}
            >
              {`Created: ${moment(location?.created_at ?? new Date()).format(
                "lll",
              )}`}
            </Typography>
          </Grid>

          <Grid item className={classes.grid_item_header}>
            <Typography
              style={{
                fontSize: 28,
                fontFamily: "Montserrat",
                fontWeight: 900,
                color: "white",
              }}
            >
              {location?.client_loc_data?.client_loc_name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: 10,
          }}
        >
          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Threshold:</Typography>
            <TextField
              fullWidth
              type="number"
              id="threshold"
              value={locationThreshold}
              onChange={(e) => handleLocationThresholdChange(e)}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">tCO2e</InputAdornment>
                ),
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Name:</Typography>
            <TextField
              fullWidth
              id="name"
              value={locationName}
              onChange={(e) => handleLocationNameChange(e)}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Phone:</Typography>
            <TextField
              fullWidth
              id="phone"
              value={locationPhone}
              onChange={(e) => handleLocationPhoneChange(e)}
              inputProps={{
                style: {
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                },
              }}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>
          <Grid item className={classes.label_grid}>
            <Typography className={classes.label}>Location Address:</Typography>

            <AddressGoogle
              address={location?.client_loc_data?.client_loc_address}
              setAddress={setAddress}
            />
          </Grid>
          <Fade in={updateLocation} timeout={2000} key={"save_edit_location"}>
            <Grid item className={classes.label_grid}>
              <Button
                sx={{
                  borderRadius: 100,
                  border: "none",
                  height: "33px",
                  width: "100%",
                  border: "none",
                  background:
                    "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
                  ":hover": {
                    opacity: 0.6,
                  },

                  ":disabled": {
                    background: "grey",
                    color: "white",
                  },

                  fontSize: 12,
                  fontFamily: "montserrat",
                  fontWeight: 900,
                  color: "white",
                  textWrap: "nowrap",
                  paddingLeft: 3,
                  paddingRight: 3,
                  textTransform: "none",
                }}
                endIcon={<SaveIcon style={{ fontSize: 16 }} />}
                onClick={handleUpdateLocation}
              >
                Update Location
              </Button>
            </Grid>
          </Fade>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "10px",
        }}
      >
        <Divider />
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Grid
            item
            style={{
              width: "100%",
              paddingBottom: 20,
            }}
          >
            <Typography
              style={{
                fontSize: "16px !important",
                fontFamily: "Montserrat",
                fontWeight: 900,
                color: "#999E9F",
              }}
            >
              Upload History
            </Typography>
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
              direction="column"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 10,
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                  height: 1,
                }}
              >
                <Divider />
              </Grid>
              {history.map((upload, index) => {
                return (
                  <div key={index}>
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
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          flexWrap: "nowrap",
                          gap: 10,
                        }}
                      >
                        <Grid
                          item
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",

                            // whiteSpace: "nowrap",
                            // overflow: "hidden",
                            // textOverflow: "ellipsis",
                            // "&:hover": {
                            //   whiteSpace: "normal",
                            //   overflow: "visible",
                            //   textOverflow: "clip",
                            // },
                          }}
                        >
                          <Typography className={classes.label}>
                            {upload.name}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            textWrap: "nowrap",
                          }}
                        >
                          <Typography className={classes.label}>
                            {moment(upload.timestamp).format("lll")}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          style={{
                            width: "10%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={upload.link}
                            download={upload.name}
                          >
                            <IconButton
                              style={{
                                minWidth: 10,
                                border: "none",
                                color: "#999E9F",
                                outline: "none",
                              }}
                            >
                              <DownloadIcon style={{ fontSize: 16 }} />
                            </IconButton>
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      style={{
                        width: "100%",
                        height: 1,
                      }}
                    >
                      <Divider />
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              paddingTop: 20,
            }}
          >
            <Button
              sx={{
                borderRadius: 100,
                border: "none",
                height: "33px",
                width: "100%",
                border: "none",
                background: "#999E9F",
                color: "white",
                ":hover": {
                  opacity: 0.6,
                  background: "#999E9F",
                },

                ":disabled": {
                  background: "grey",
                },

                fontSize: 12,
                fontFamily: "montserrat",
                fontWeight: 900,
                textWrap: "nowrap",
                paddingLeft: 3,
                paddingRight: 3,
                textTransform: "none",
              }}
              endIcon={<LoopRoundedIcon style={{ fontSize: 16 }} />}
              onClick={handleResetDatabase}
            >
              Reset Database
            </Button>
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
            }}
            onClick={handleDeleteLocation}
          >
            <Typography className={classes.delete_location}>
              Delete Location
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

DrawerMain.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setUpdated: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  setExpenseUpdated: PropTypes.func.isRequired,
  setGlobalLocation: PropTypes.func.isRequired,
};

export default DrawerMain;
