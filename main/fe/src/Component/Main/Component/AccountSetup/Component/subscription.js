import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
  Collapse,
  Button,
  Fade,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { axiosRootInstance } from "../../../../../Service/axios-instance";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
    flexWrap: "nowrap !important",
    gap: 20,
    "@media (max-width:500px)": {
      margin: "200px 0 200px 0",
    },
  },
  grid_card_title: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  grid_card_content: {
    border: "3px solid #4690CD",
    borderRadius: "10px",
    margin: 10,
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    padding: "20px",
  },
  grid_plan: {
    width: "100%",
    padding: 10,
    cursor: "pointer",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },

  plan_description: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.center,
    width: "100%",
    padding: 10,
    gap: 10,
  },

  plan_text: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "#707070",
  },
  plan_sub_text: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 500,
    color: "#707070",
  },
}));

function Subscription({ customer, setCustomer }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useAuth0();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedPlan, setSelectedPlan] = useState();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    const fetchPlansData = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-get-chargebee-plans`
            : `/staging-sc2-get-chargebee-plans`;

        // const response = await axiosBaseInstance.get("/chargebee/plans");
        const response = await axiosRootInstance.get(url);
        setPlans(response.data.record);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchPlansData();
  };

  const [hostedId, setHostedId] = useState("");
  useEffect(() => {
    if (user && hostedId) {
      fetchCheckoutInfo(hostedId);
    }
  }, [hostedId]);

  const fetchCheckoutInfo = (id) => {
    const fetchCheckoutInfoData = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-chargebee-get-checkout-info`
            : `/staging-sc2-chargebee-get-checkout-info`;
        const sub = user.sub;
        const result = await axiosRootInstance.get(url, {
          // const result = await axiosBaseInstance.get("/chargebee/checkout-info", {
          params: {
            user_id: sub,
            hosted_page_id: id,
          },
        });
        setCustomer &&
          setCustomer({
            ...customer,
            plan_id: result.data.record.item_price_id,
            subscription_id: result.data.record.subscription_id,
          });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchCheckoutInfoData();
  };

  const checkoutPlan = async (id) => {
    setSelectedPlan(id);
    try {
      await window.Chargebee.getInstance().openCheckout({
        async hostedPage() {
          const url =
            process.env.REACT_APP_STAGE === "PRODUCTION"
              ? `/production-sc2-post-chargebee-hosted-checkout`
              : `/staging-sc2-post-chargebee-hosted-checkout`;

          // const result = await axiosBaseInstance.post(
          //   "/chargebee/hosted-checkout",

          const result = await axiosRootInstance.post(
            url,
            {
              plan_id: id,
              user_id: user.sub,
              email: user.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          return result.data?.record?.hosted_page;
        },
        success(hostedPageId) {
          setHostedId(hostedPageId);
        },
        close() {},
        step(step) {},
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = (index) => {
    setSelectedIndex(index);
    plans.map((plan, i) => {
      if (index !== i) {
        plan["selected"] = false;
      }
    });
    plans[index]["selected"] = !plans[index]["selected"];
    setPlans(plans);
    setExpanded(!isExpanded);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.grid_card}
    >
      <Grid item xs={1} className={classes.grid_card_title}>
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#999E9F",
          }}
        >
          Subscription
        </Typography>
      </Grid>

      <Grid item xs className={classes.grid_card_content}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.grid_card}
        >
          {plans && plans.length > 0 ? (
            plans.map((plan, index) => {
              console.log("plan:", plan);
              return (
                <Grid
                  key={`plan_${index}`}
                  item
                  xs
                  className={classes.grid_plan}
                  onClick={() => handleToggle(index)}
                  style={{
                    opacity: selectedIndex === index ? 1 : 0.7,
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    // className={classes.grid_card}
                    style={{
                      width: "100%",
                      // flexWrap: "nowrap",
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
                      <Typography
                        style={{
                          fontSize: 20,
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                          color: "#4690CD",
                        }}
                      >
                        {plan.item.name}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 33,
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                          color: "#4690CD",
                        }}
                      >
                        {`$${
                          plan.item.price > 0
                            ? plan.item.price / 100
                            : plan.item.price
                        }`}
                        <span
                          style={{
                            fontSize: 10,
                            color: "grey",
                          }}
                        >
                          /mo
                        </span>
                      </Typography>
                    </Grid>

                    <Collapse
                      in={plan.selected}
                      key={`plan_collapse_${index}`}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        // className={classes.grid_card}
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
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            // className={classes.grid_card}
                            style={{
                              width: "100%",
                            }}
                          >
                            <Grid
                              item
                              xs
                              className={classes.plan_description}
                            ></Grid>

                            <Grid item xs className={classes.plan_description}>
                              <Typography className={classes.plan_text}>
                                {plan?.item?.metadata
                                  ?.additionalTransactionsFee ?? ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

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
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            // className={classes.grid_card}
                            style={{
                              width: "100%",
                            }}
                          >
                            <Grid item xs className={classes.plan_description}>
                              <PlaylistAddCheckIcon style={{ padding: 2 }} />
                              <Typography className={classes.plan_sub_text}>
                                {plan?.item?.metadata?.shortDescription ?? ""}
                              </Typography>
                            </Grid>

                            <Grid item xs className={classes.plan_description}>
                              <EqualizerIcon style={{ padding: 2 }} />
                              <Typography className={classes.plan_sub_text}>
                                {plan?.item?.metadata?.underAmountDesc ?? ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs
                          style={{
                            width: "100%",
                          }}
                        >
                          <Fade in={selectedIndex === index} timeout={1000}>
                            <Button
                              sx={{
                                borderRadius: 100,
                                border: "none",
                                height: "33px",
                                minWidth: "100%",
                                border: "none",
                                background:
                                  "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
                                ":hover": {
                                  opacity: 0.6,
                                },

                                fontSize: "16px !important",
                                fontFamily: "montserrat",
                                fontWeight: 900,
                                color: "white",
                                textWrap: "nowrap",
                                textTransform: "none",
                              }}
                              onClick={() => checkoutPlan(plan.item.id)}
                            >
                              Select This Plan
                            </Button>
                          </Fade>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

Subscription.propTypes = {
  customer: PropTypes.object.isRequired,
  setCustomer: PropTypes.func.isRequired,
};

export default Subscription;
