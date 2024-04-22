import { Grid, Typography, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LayersIcon from "@mui/icons-material/Layers";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import account_icon from "./assets/account.svg";
import address_icon from "./assets/address.svg";
import billing_icon from "./assets/billing.svg";
import edit_icon from "./assets/edit.svg";
import payment_icon from "./assets/payment.svg";
import { axiosBaseInstance } from "../../../Service/axios-instance";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "20px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#4690CD",
  },
  sub_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#777B7E",
  },

  grid_chargebee_actions: {
    width: "100%",
    flexWrap: "nowrap",

    background: "transparent",
    gap: 10,
  },
  grid_chargebee_action: {
    width: "100% !important",
    padding: "20px  !important",
    gap: "10px  !important",
    flexWrap: "nowrap !important",
    borderRadius: "10px  !important",

    "&:hover": {
      background: "#00000012 !important",
      cursor: "pointer",

      "&:hover $chargebee_arrow_icon": {
        opacity: 1,
      },
    },
  },
  grid_chargebee_action_icon: {
    width: "10% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },
  chargebee_action_icon: {
    width: "18px  !important",
    height: "18px  !important",
  },
  grid_chargebee_arrow: {
    width: "20% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "flex-end !important",
  },
  chargebee_arrow_icon: {
    width: "18px  !important",
    height: "18px  !important",
    opacity: 0,
    color: "#31313A",
    transition: "opacity 1s",
  },
  grid_chargebee_action_text: {
    width: "100% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "flex-start !important",
  },
  chargebee_action_text: {
    fontSize: "12px !important",
    fontFamily: "montserrat !important",
    color: "#31313A !important",
    fontWeight: "900 !important",
  },
}));
const SettingBilling = ({ customer }) => {
  const classes = useStyles();

  const [chargebee, setChargebee] = useState(null);

  const initUserChargebee = () => {
    const initUserChargebeeData = async () => {
      try {
        const response = await axiosBaseInstance.get("/customer/chargebee", {
          params: {
            customer_id: customer.subscription_id,
          },
        });
        setChargebee(response.data.data);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    initUserChargebeeData();
  };

  useEffect(() => {
    initUserChargebee();
  }, []);

  const areFieldsIdentical = (obj1, obj2, fields) => {
    for (const field of fields) {
      if (obj1[field] !== obj2[field]) {
        return false;
      }
    }
    return true;
  };

  const [chargebeePortal, setChargebeePortal] = useState(null);

  const handleChargebeePortal = (portal) => {
    const getChargebeePortal = async () => {
      try {
        const response = await axiosBaseInstance.get("/chargebee/portal", {
          params: {
            subscription_id: customer.subscription_id,
            portal: portal,
          },
        });
        setChargebeePortal(response?.data?.url);
        handleChargebeePortalOpen(true);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    getChargebeePortal();
  };

  const [chargebeePortalOpen, setChargebeePortalOpen] = useState(false);

  const handleChargebeePortalOpen = () => {
    setChargebeePortalOpen(true);
  };

  const handleChargebeePortalClose = () => {
    setChargebeePortalOpen(false);
  };

  return (
    <Grid item id="billing-anchor" style={{ width: "100%" }}>
      <Fade key={`billing_card`} in={true} timeout={2000}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            padding: "20px",
            gap: 15,
          }}
        >
          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.title}>Billing</Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_title}>
              Manage your billing and payment details
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%", paddingTop: 20 }}>
            {chargebee && (
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                  width: "100%",
                  flexWrap: "nowrap",

                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "3px solid #4690CD",
                  borderRadius: 10,
                  padding: 30,
                  gap: 10,
                }}
              >
                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      width: "100%",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Grid
                      item
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <LayersIcon style={{ color: "#D3D3D3" }} />
                    </Grid>

                    <Grid
                      item
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",

                        background:
                          "transparent linear-gradient(101deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
                        borderRadius: 100,
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          color: "white",
                        }}
                      >
                        Trial Active
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Typography
                    style={{
                      fontSize: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "900",
                      color: "#4690CD",
                    }}
                  >
                    {`${chargebee.subscription.item_price_id}`}
                  </Typography>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Typography
                    style={{
                      fontSize: "12px !important",
                      fontFamily: "Montserrat",
                      fontWeight: "900",
                      color: "#3E454B",
                    }}
                  >
                    Includes full access to SCOP3's features, within a 30 day
                    trial.
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    width: "100%",
                    paddingTop: 60,
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
                      flexWrap: "nowrap",
                      gap: 10,
                    }}
                  >
                    <Grid
                      item
                      style={{
                        width: "10%",
                        background:
                          "transparent linear-gradient(157deg, #CF8B46 0%, #D4B308 100%) 0% 0% no-repeat padding-box",

                        borderRadius: 100,

                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          color: "white",
                        }}
                      >
                        {`${
                          chargebee.trial_end_days < 0
                            ? 0
                            : chargebee.trial_end_days
                        }`}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      style={{
                        width: "100%",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          color: "#999E9F",
                        }}
                      >
                        Days Remaining in Free Trial
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid item style={{ width: "100%", paddingTop: 20 }}>
            {chargebee && (
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className={classes.grid_chargebee_actions}
              >
                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_chargebee_action}
                    onClick={() => handleChargebeePortal("edit")}
                  >
                    <Grid item className={classes.grid_chargebee_action_icon}>
                      <img
                        src={edit_icon}
                        className={classes.chargebee_action_icon}
                      />
                    </Grid>

                    <Grid item className={classes.grid_chargebee_action_text}>
                      <Typography className={classes.chargebee_action_text}>
                        View / Edit subscription details
                      </Typography>
                    </Grid>

                    <Grid item className={classes.grid_chargebee_arrow}>
                      <ArrowForwardIosIcon
                        className={classes.chargebee_arrow_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_chargebee_action}
                    onClick={() => handleChargebeePortal("payment")}
                  >
                    <Grid item className={classes.grid_chargebee_action_icon}>
                      <img
                        src={payment_icon}
                        className={classes.chargebee_action_icon}
                      />
                    </Grid>

                    <Grid item className={classes.grid_chargebee_action_text}>
                      <Typography className={classes.chargebee_action_text}>
                        Manage payment methods
                      </Typography>
                    </Grid>

                    <Grid item className={classes.grid_chargebee_arrow}>
                      <ArrowForwardIosIcon
                        className={classes.chargebee_arrow_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_chargebee_action}
                    onClick={() => handleChargebeePortal("billing")}
                  >
                    <Grid item className={classes.grid_chargebee_action_icon}>
                      <img
                        src={billing_icon}
                        className={classes.chargebee_action_icon}
                      />
                    </Grid>

                    <Grid item className={classes.grid_chargebee_action_text}>
                      <Typography className={classes.chargebee_action_text}>
                        Billing history
                      </Typography>
                    </Grid>

                    <Grid item className={classes.grid_chargebee_arrow}>
                      <ArrowForwardIosIcon
                        className={classes.chargebee_arrow_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_chargebee_action}
                    onClick={() => handleChargebeePortal("address")}
                  >
                    <Grid item className={classes.grid_chargebee_action_icon}>
                      <img
                        src={address_icon}
                        className={classes.chargebee_action_icon}
                      />
                    </Grid>

                    <Grid item className={classes.grid_chargebee_action_text}>
                      <Typography className={classes.chargebee_action_text}>
                        Manage addresses
                      </Typography>
                    </Grid>

                    <Grid item className={classes.grid_chargebee_arrow}>
                      <ArrowForwardIosIcon
                        className={classes.chargebee_arrow_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.grid_chargebee_action}
                    onClick={() => handleChargebeePortal("account")}
                  >
                    <Grid item className={classes.grid_chargebee_action_icon}>
                      <img
                        src={account_icon}
                        className={classes.chargebee_action_icon}
                      />
                    </Grid>

                    <Grid item className={classes.grid_chargebee_action_text}>
                      <Typography className={classes.chargebee_action_text}>
                        Manage account information
                      </Typography>
                    </Grid>

                    <Grid item className={classes.grid_chargebee_arrow}>
                      <ArrowForwardIosIcon
                        className={classes.chargebee_arrow_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Grid>
  );
};

SettingBilling.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default SettingBilling;
