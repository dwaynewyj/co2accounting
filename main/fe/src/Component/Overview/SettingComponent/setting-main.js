import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import ChargebeePortal from "./chargebee-portal.js";
import SettingLeft from "./setting-left.js";
import SettingRight from "./setting-right.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_root: {
    width: "100%",
    flexWrap: "nowrap",
  },

  grid_left_container: {
    width: "100%",
    flexWrap: "nowrap",
    paddingRight: 20,
  },
  grid_left_item: {
    width: "100%",
    height: "100%",

    flexWrap: "nowrap !important",
    gap: 10,

    cursor: "pointer",
    "&:hover": {
      background: "#F8F8F8 0% 0% no-repeat padding-box",
    },
  },

  grid_left_item_icon: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  left_icon: {
    fontSize: "16px !important",
    color: "#3E454B",
  },

  left_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat",
    fontWeight: 900,
    color: "#3E454B",
  },

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
    width: "100% !important",
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
    fontSize: "16px !important",
    fontFamily: "montserrat !important",
    color: "#31313A !important",
    fontWeight: "900 !important",
  },
}));
const SettingMain = ({ customer }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  const [updateUser, setUpdateUser] = useState(user);
  const [chargebee, setChargebee] = useState(null);

  const handleUserNameChange = (event) => {
    setUpdateUser({ ...updateUser, name: event.target.value });
  };

  const handleUserNicknameChange = (event) => {
    setUpdateUser({ ...updateUser, nickname: event.target.value });
  };

  const handleUserEmailChange = (event) => {
    setUpdateUser({ ...updateUser, email: event.target.value });
  };

  const handleUpdateUser = () => {
    const updateUserAuth0 = async () => {
      try {
        const response = await axiosBaseInstance.put(
          "/customer/auth0",
          {
            email: updateUser.email,
            name: updateUser.name,
            nickname: updateUser.nickname,
          },
          {
            params: {
              user_id: user.sub,
            },
          },
        );
        window.location.reload(true);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    updateUserAuth0();
  };

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

  const scrollToAnchor = (key) => {
    const anchor = document.getElementById(key);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <>
      {chargebeePortal && (
        <ChargebeePortal
          url={chargebeePortal}
          open={chargebeePortalOpen}
          handleClose={handleChargebeePortalClose}
        />
      )}
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        className={classes.grid_root}
      >
        <SettingLeft />
        <Grid item xs>
          <Divider
            style={{ height: "150vh", maxWidth: "1px" }}
            orientation="vertical"
            flexItem
          />
        </Grid>

        <SettingRight customer={customer} />
      </Grid>
    </>
  );
};

SettingMain.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default SettingMain;
