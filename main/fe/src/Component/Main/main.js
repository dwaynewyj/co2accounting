import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import HelpButton from "../Auth/help-button.js";
import LogoutButton from "../Auth/log-out-button.js";
import SelectClient from "./Component/SelectClient/select-client.js";
import AccountSetup from "./Component/AccountSetup/account-setup.js";
import { useTheme } from "@mui/material/styles";
import { axiosBaseInstance } from "../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: theme.display.flex,
    // justifyContent: theme.justifyContent.center,
    // alignItems: theme.alignItems.center,

    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundImage: `url(/static/background.png)`,
    // height: "100vh",
    flexWrap: "nowrap !important",
    overflowY: "scroll",

    minHeight: "100vh",
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "flex-start !important",
  },
  grid_header: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  header: {
    width: "100vw",
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    // position: "absolute",
    top: 0,
    padding: 50,
  },
  grid_logo: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    padding: "20px",
  },
  grid_actions: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.end,
    alignItems: theme.alignItems.center,
  },
  actions: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.end,
    alignItems: theme.alignItems.center,
  },
  action_log_out: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  action_help: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },

  grid_content: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    // height: "100vh",
    padding: "0 100px 100px 100px",

    "@media (max-width:500px)": {
      alignItems: theme.alignItems.end,
    },
  },
}));

function Main({}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth0();

  const [customer, setCustomer] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.cust_org_id) {
      fetchCustomer(user.cust_org_id);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCustomer = (cust_org_id) => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosBaseInstance.get("/customer", {
          params: {
            id: cust_org_id,
          },
        });

        if (response.data.customer) {
          setCustomer(response.data.customer);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchCustomerData();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <Grid item xs={2} className={classes.grid_header}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.header}
        >
          <Grid item xs className={classes.grid_logo}>
            <Fade in={true} timeout={2000}>
              <img
                src={"/static/logo.svg"}
                alt={"/static/logo.svg"}
                style={{ width: 200 }}
              />
            </Fade>
          </Grid>

          <Grid item xs className={classes.grid_actions}>
            <Fade in={true} timeout={2000}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className={classes.actions}
              >
                <Grid item xs className={classes.action_log_out}>
                  <LogoutButton />
                </Grid>
                <Grid item xs className={classes.action_help}>
                  <HelpButton />
                </Grid>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={10} className={classes.grid_content}>
        <Card
          elevation={3}
          sx={{
            // margin: !fullScreen && "100px",

            overflowY: fullScreen && "scroll",
            width: "100%",
            minWidth: "300px",
            height: "100%",
            // minHeight: "500px",
            borderRadius: 20,
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "0px 21px 99px #00000029",
          }}
        >
          <CardContent
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user &&
              (customer && Object.keys(customer).length > 0 ? (
                <SelectClient customer={customer} />
              ) : isLoading ? (
                <AccountSetup />
              ) : (
                <CircularProgress />
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default Main;
