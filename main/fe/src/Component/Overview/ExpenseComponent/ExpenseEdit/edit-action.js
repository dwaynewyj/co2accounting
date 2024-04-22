import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  Fade as MUIFade,
  Alert as MuiAlert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoutIcon from "@mui/icons-material/Logout";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditAction = ({
  locationAllLoading,
  onPrevClick,
  onExitClick,
  onNextClick,
}) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <MUIFade in={true} timeout={1000}>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            disabled={locationAllLoading}
            sx={{
              fontSize: 12,
              fontFamily: "Montserrat",
              fontWeight: "900 !important",
              color: "#4690CD",
              textTransform: "uppercase",
              background:
                "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box",
              color: "white",
              padding: "5px 10px 5px 10px",
              ":hover": {
                opacity: 0.8,
                color: "white",
              },
              ":disabled": {
                background: "grey",
                color: "white",
              },
              textTransform: "none",
            }}
            startIcon={<ArrowBackIcon style={{ fontSize: 16 }} />}
            onClick={onPrevClick}
          >
            Previous
          </Button>
        </Grid>
      </MUIFade>
      <MUIFade in={true} timeout={1000}>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            disabled={locationAllLoading}
            sx={{
              fontSize: 12,
              fontFamily: "Montserrat",
              fontWeight: "900 !important",
              color: "#4690CD",
              textTransform: "uppercase",
              background:
                "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box",
              color: "white",
              padding: "5px 10px 5px 10px",
              ":hover": {
                opacity: 0.8,
                color: "white",
              },
              ":disabled": {
                background: "grey",
                color: "white",
              },
              textTransform: "none",
            }}
            endIcon={<LogoutIcon style={{ fontSize: 16 }} />}
            onClick={onExitClick}
          >
            Exit
          </Button>
        </Grid>
      </MUIFade>
      <MUIFade in={true} timeout={1000}>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            disabled={locationAllLoading}
            sx={{
              fontSize: 12,
              fontFamily: "Montserrat",
              fontWeight: "900 !important",
              color: "#4690CD",
              textTransform: "uppercase",
              background:
                "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box",
              color: "white",
              padding: "5px 10px 5px 10px",
              ":hover": {
                opacity: 0.8,
                color: "white",
              },
              ":disabled": {
                background: "grey",
                color: "white",
              },
              textTransform: "none",
            }}
            endIcon={<ArrowForwardIcon style={{ fontSize: 16 }} />}
            onClick={onNextClick}
          >
            Next
          </Button>
        </Grid>
      </MUIFade>
    </Grid>
  );
};

EditAction.propTypes = {
  locationAllLoading: PropTypes.bool.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onExitClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default EditAction;
