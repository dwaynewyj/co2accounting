import {
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Fade,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import Eula from "./Component/eula.js";
import ClientCard from "./Component/client-card.js";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Subscription from "./Component/subscription.js";
import { useNavigate } from "react-router-dom";
import SButton from "../Button/sbutton.js";
import {
  axiosBaseInstance,
  axiosRootInstance,
} from "../../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
    height: "100%",
    flexWrap: "nowrap !important",
    padding: "50px 0 50px 0",
  },
  grid_card_title: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  grid_card_content: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },
  grid_card_action: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.center,
    width: "100%",
  },

  content_left: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.start,

    minWidth: 250,
    maxWidth: "48%",
    width: "100%",
    "@media (max-width:1000px)": {
      maxWidth: "100%",
    },
  },
  content_right: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.start,

    padding: "20px",
    minWidth: 250,
    maxWidth: "48%",
    width: "100%",
    height: "100%",
    "@media (max-width:1000px)": {
      maxWidth: "100%",
    },
  },

  label_grid: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.start,
    alignItems: theme.alignItems.start,
    width: "100%",
    flexDirection: "column !important",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
}));

function AccountSetup() {
  const classes = useStyles();
  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useAuth0();
  const [index, setIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    accountInit();
  }, []);

  const accountInit = () => {
    const accountInitData = async () => {
      try {
        const response = await axiosBaseInstance.post("/customer/init", {
          user_id: user.sub,
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    accountInitData();
  };

  //============================================================================
  // Customer Info
  //============================================================================
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
    setCustomer({ ...customer, name: event.target.value });
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setCustomer({ ...customer, email: event.target.value });
  };

  const [phone, setPhone] = useState("");
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setCustomer({ ...customer, phone: event.target.value });
  };

  //============================================================================
  // Client Info
  //============================================================================
  const [client, setClient] = useState(null);

  const requiredCustomerFields = [
    "name",
    "email",
    "phone",
    "plan_id",
    "subscription_id",
  ];

  const isFieldsNotEmpty = (formData, fields) => {
    if (!formData) {
      return false;
    }
    for (const field of fields) {
      if (!formData[field] || Object.values(formData[field]).length <= 0) {
        return false;
      }
    }
    return true;
  };

  const requiredClientFields = ["name", "industry", "type", "phone", "address"];

  const [isSettingUp, setIsSettingUp] = useState(false);

  const handleAccountSetup = () => {
    setIsSettingUp(true);
    const handleClientSetupData = async (payload) => {
      try {
        const response = await axiosBaseInstance.post("/client", payload);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    const handleCustomerSetupData = async () => {
      try {
        const response = await axiosBaseInstance.post("/customer", {
          ...customer,
          user_id: user.sub,
        });
        updateUserAuth0(response.data.customer._id);
        handleClientSetupData({
          cust_org_id: response.data.customer._id,
          name: client.name,
          industry: client.industry,
          type: client.type,
          phone: client.phone,
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    handleCustomerSetupData();
  };

  const updateUserAuth0 = (cust_org_id) => {
    const updateUserAuth0Data = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-crud-auth0-user`
            : `/staging-sc2-crud-auth0-user`;

        const response = await axiosRootInstance.put(
          url,
          // const response = await axiosBaseInstance.put(
          //   "/customer/auth0",
          {
            cust_org_id: cust_org_id,
            registrationStep: "account_setup",
          },
          {
            params: {
              user_id: user.sub,
            },
          },
        );
        navigate(`/clients`, { replace: true });
        window.location.reload();
        setIsSettingUp(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    updateUserAuth0Data();
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
      {user &&
        user?.registrationStep !== "eula" &&
        user?.registrationStep !== "account_setup" && <Eula user={user} />}
      <Grid item className={classes.grid_card_title}>
        <Typography
          style={{
            fontSize: 32,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#999E9F",
          }}
        >
          Account Setup
        </Typography>
      </Grid>
      <Grid item className={classes.grid_card_content}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          // className={classes.grid_card}
          style={{
            height: "100%",
            padding: "20px",
            gap: 20,
          }}
        >
          <Grid item className={classes.content_left}>
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
              // className={classes.grid_card}
              style={{
                height: "100%",
                gap: 10,
              }}
            >
              <Grid item className={classes.label_grid}>
                <Typography className={classes.label}>Name:</Typography>
                <TextField
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      fontWeight: 900,
                    },
                  }}
                />
              </Grid>

              <Grid item className={classes.label_grid}>
                <Typography className={classes.label}>Email:</Typography>
                <TextField
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      fontWeight: 900,
                    },
                  }}
                />
              </Grid>

              <Grid item className={classes.label_grid}>
                <Typography className={classes.label}>Phone:</Typography>
                <TextField
                  fullWidth
                  id="phone"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e)}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      fontWeight: 900,
                    },
                  }}
                />
              </Grid>

              <Grid
                item
                className={classes.label_grid}
                style={{
                  padding: !fullScreen && 40,
                }}
              >
                <ClientCard client={client} setClient={setClient} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.content_right}>
            <Subscription customer={customer} setCustomer={setCustomer} />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        className={classes.grid_card_title}
        style={{
          padding: 10,
        }}
      >
        {!isSettingUp ? (
          <Fade in={true} timeout={1000}>
            <div>
              <SButton
                onClick={handleAccountSetup}
                disabled={
                  !(
                    customer &&
                    isFieldsNotEmpty(customer, requiredCustomerFields) &&
                    client &&
                    isFieldsNotEmpty(client, requiredClientFields)
                  )
                }
              />
            </div>
          </Fade>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}

export default AccountSetup;
