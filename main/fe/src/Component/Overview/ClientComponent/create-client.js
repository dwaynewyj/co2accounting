import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CreateClientCard from "./create-client-card.js";
import { axiosBaseInstance } from "../../../Service/axios-instance.js";

function CreateClient({ customer, open, setOpen, setUpdated }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [client, setClient] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createClient = (client_org_id) => {
    const createClientData = async () => {
      try {
        const response = await axiosBaseInstance.post("/client", {
          cust_org_id: customer._id,
          ...client,
        });
        setUpdated(true);
        setOpen(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    createClientData();
  };

  const handleCreateClient = () => {
    createClient(client._id);
  };

  const requiredClientFields = ["name", "industry", "phone", "type"];

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
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: 20,
              fontFamily: "montserrat",
              fontWeight: 900,
              color: "#4690CD",
            }}
          >
            Create Client
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
              gap: 10,
              width: "100%",
            }}
          >
            <Grid
              item
              xs
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CreateClientCard customer={customer} setClient={setClient} />
            </Grid>

            <Grid
              item
              xs
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                disabled={
                  !(client && isFieldsNotEmpty(client, requiredClientFields))
                }
                key={"create"}
                sx={{
                  borderRadius: 100,
                  border: "none",
                  height: "33px",
                  width: "200px",
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
                onClick={() => handleCreateClient()}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateClient.propTypes = {
  customer: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default CreateClient;
