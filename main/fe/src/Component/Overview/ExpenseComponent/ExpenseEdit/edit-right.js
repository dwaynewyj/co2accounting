import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  Chip,
  TextField,
  Fade as MUIFade,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { BsFillCalculatorFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  grid_item: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  description_text: {
    fontSize: "12px !important",
    fontFamily: "montserrat",
    fontWeight: 900,
    color: "#999E9F",
  },
  grid_result: {
    width: "100%",
    display: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

const EditRight = ({
  singleExpense,
  locationAll,
  locationAllLoading,
  handleChipClick,
  calculatationResult,
  handleCalculationResultChange,
  calculateOpen,
  handleCalculateEmissions,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item className={classes.grid_item}>
        <Typography
          style={{
            color: "rgb(70, 144, 205)",
            fontSize: 20,
            fontFamily: "montserrat",
            fontWeight: 900,
          }}
        >{`Scope 3`}</Typography>
      </Grid>

      <Grid item className={classes.grid_item}>
        <Typography
          className={classes.description_text}
        >{`Indirect emissions from assets not controlled by you.`}</Typography>
      </Grid>

      <Grid item className={classes.grid_item}>
        <Typography
          className={classes.description_text}
        >{`Select your preferred saving method for these choices.`}</Typography>
      </Grid>

      <Grid item className={classes.grid_item}>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          style={{
            width: "100%",
          }}
        >
          <Grid
            item
            style={{
              width: "100%",
              display: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Chip
              label="Save for this expense"
              variant="outlined"
              onClick={handleChipClick}
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "12px !important",
                fontFamily: "montserrat",
                fontWeight: 900,
                background: !locationAll
                  ? "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box"
                  : "transparent",
                color: !locationAll ? "white" : "#6C7993",
                borderColor: "#6C7993",
              }}
            />
          </Grid>

          <Grid
            item
            style={{
              width: "100%",
              display: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Chip
              label="Save for this payee"
              variant="outlined"
              onClick={handleChipClick}
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "12px !important",
                fontFamily: "montserrat",
                fontWeight: 900,
                background: locationAll
                  ? "transparent linear-gradient(118deg, #4699cf 0%, #4673c4 100%) 0% 0% no-repeat padding-box"
                  : "transparent",
                color: locationAll ? "white" : "#6C7993",
                borderColor: "#6C7993",
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <MUIFade
        in={
          typeof singleExpense?.ghg_data?.CO2e_kg === "number" || calculateOpen
        }
        timeout={1000}
      >
        <Grid item className={classes.grid_result}>
          <TextField
            id="calculatationResult"
            label=""
            type="number"
            style={{ width: "100%", height: "100%" }}
            onChange={handleCalculationResultChange}
            value={
              calculatationResult
                ? calculatationResult
                : singleExpense?.ghg_data?.CO2e_kg
            }
            sx={{
              width: "100%",
              input: {
                fontSize: 32,
                fontFamily: "Montserrat",
                fontWeight: "900 !important",
                color: "#4690CD",

                textAlign: "center",
              },
            }}
          />
        </Grid>
      </MUIFade>
      <MUIFade in={calculateOpen} timeout={1000}>
        <Grid item className={classes.grid_result}>
          {!locationAllLoading ? (
            <Button
              disabled={!calculateOpen}
              sx={{
                width: "100%",

                fontSize: "12px !important",
                fontFamily: "montserrat",
                fontWeight: 900,
                textTransform: "none",
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
              }}
              endIcon={<BsFillCalculatorFill size="16" />}
              onClick={handleCalculateEmissions}
            >
              Calculate Emissions
            </Button>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </Grid>
      </MUIFade>
    </Grid>
  );
};

EditRight.propTypes = {
  singleExpense: PropTypes.object.isRequired,
  locationAll: PropTypes.bool.isRequired,
  locationAllLoading: PropTypes.bool.isRequired,
  handleChipClick: PropTypes.func.isRequired,
  calculatationResult: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]),
  calculateOpen: PropTypes.bool.isRequired,
  handleCalculateEmissions: PropTypes.func.isRequired,
};

export default EditRight;
