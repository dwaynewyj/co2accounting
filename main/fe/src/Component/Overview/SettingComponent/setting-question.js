import { Grid, Typography, Button, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HelpIcon from "@mui/icons-material/Help";
import React from "react";

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

  sub_text: {
    fontSize: "12px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#777B7E",
  },
}));
const SettingQuestion = () => {
  const classes = useStyles();

  return (
    <Grid item id="question-anchor" style={{ width: "100%" }}>
      <Fade key={`question_card`} in={true} timeout={2000}>
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
            <Typography className={classes.title}>Questions?</Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_title}>
              We're here to help. Check out our help center or contact us below.
            </Typography>
          </Grid>

          <Grid
            item
            style={{ width: "100%", paddingTop: 20, paddingBottom: 20 }}
          >
            <Button
              endIcon={<HelpIcon style={{ fontSize: 16 }} />}
              onClick={() => {
                const newWindow = window.open(
                  "https://www.climateaccounting.com/help-center/getting-started-with-scop3 ",
                  "_blank",
                );
                newWindow.focus();
              }}
            >
              Help Center
            </Button>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_text}>
              Call Customer Support
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_text}>
              (204) 669 - 8716
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_text}>
              sales@standardcarbon.ai
            </Typography>
          </Grid>
        </Grid>
      </Fade>
    </Grid>
  );
};

export default SettingQuestion;
