import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md";
import { Grid, IconButton, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import EditClient from "./edit-client.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  grid_card: {
    display: theme.display.flex,
    justifyContent: theme.justifyContent.center,
    alignItems: theme.alignItems.start,
    width: "100%",
    height: "100%",

    "&:hover": {
      boxShadow: "0px 21px 99px #00000033",
      transition: "box-shadow 1s",
    },
  },

  // title: {
  //   display: theme.display.flex,
  //   justifyContent: theme.justifyContent.start,
  //   alignItems: theme.alignItems.start,
  //   width: "100%",
  //   flexDirection: "column !important",
  // },
  grid_years: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "scroll",
  },
  grid_year: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    cursor: "pointer",
    "&:hover": {
      background: "#F9F9F9 0% 0% no-repeat padding-box",
    },
  },
}));

function ClientCard({ client, setGlobalClient, setUpdated }) {
  const classes = useStyles();
  const [clientData, setClientData] = useState({ ...client });
  const [edit, setEdit] = React.useState(false);
  const [edited, setEdited] = React.useState(false);
  const onEditClick = () => {
    setEdit((prev) => !prev);

    if (edit && clientData && Object.values(clientData).length && edited) {
      updateClient();
    }
  };

  const updateClient = () => {
    const updateClientData = async () => {
      try {
        const payload = {
          name: clientData.client_org_data.client_org_name,
          industry: clientData.client_org_data.client_org_industry,
          phone: clientData.client_org_data.client_org_phoneNumber,
          type: clientData.client_org_data.client_org_type,
        };
        const response = await axiosBaseInstance.put("/client", payload, {
          params: {
            client_org_id: clientData._id,
          },
        });
        setUpdated(true);
        setEdited(false);
        // window.location.reload();
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    updateClientData();
  };

  return (
    <Card
      key={`client_card_${client._id}`}
      elevation={3}
      sx={{
        scale: "0.9",
        width: "350px !important",
        height: "auto",
        borderRadius: 5,
        // padding: "20px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 21px 99px #00000012",
      }}
      className={classes.grid_card}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "unset",
        }}
      >
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            size="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 900,
              width: "100px",
              color: "white",
              borderRadius: "99px",
              background:
                "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",

              position: "absolute",
              zIndex: "inherit",
              margin: "20px",
            }}
          >{`${client?.client_org_data.client_org_type}`}</Typography>
          <img
            src={"/static/client-small.png"}
            alt={"/static/client-small.png"}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Grid>

        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{}}
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
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{
                  flexWrap: "nowrap",
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
                    variant="title"
                    sx={{
                      fontSize: 20,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 200,
                    }}
                  >
                    {client?.client_org_data?.client_org_name}
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={onEditClick}
                    style={{
                      backgroundColor: "transparent",
                      padding: 5,
                    }}
                  >
                    {!edit ? <MdEdit /> : <SaveIcon />}
                  </IconButton>
                </Grid>
              </Grid>
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
              <EditClient
                edit={edit}
                setEdited={setEdited}
                clientData={clientData}
                setClientData={setClientData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

ClientCard.propTypes = {
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([undefined])]),
  setUpdated: PropTypes.func,
};

export default ClientCard;
