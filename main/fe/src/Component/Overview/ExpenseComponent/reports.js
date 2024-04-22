import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import report_location_icon from "./assets/report-location.svg";
import report_client_icon from "./assets/report-client.svg";

const useStyles = makeStyles((theme) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
  "&:hover": {
    background: "#F9F9F9 0% 0% no-repeat padding-box",
  },

  grid_item_title: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: "32px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#467EC7",
    padding: "20px",
  },
  sub_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#A2A2A2",
    paddingLeft: 20,
  },

  list_item: {
    backgroundColor: "rgba(220, 0, 50, 0.1)",

    padding: "20px",
  },
}));

function Reports({ reports, location, open, setOpen }) {
  const classes = useStyles();
  const { user } = useAuth0();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //============================================================================
  // Import Expense Dialog
  //============================================================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [expand, setExpand] = React.useState(true);

  const handleClickExpand = () => {
    setExpand(!expand);
  };

  //============================================================================
  // Main Render
  //============================================================================
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            minWidth: "80%",
            minHeight: "50%",
            padding: "30px",
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={0}
            direction="row"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Grid item style={{}}>
              <img src={report_client_icon} />
            </Grid>

            <Grid
              item
              style={{
                width: "100%",
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                  padding: "20px",
                }}
              >
                <Grid item className={classes.grid_item_title}>
                  <Typography className={classes.sub_title}>
                    GHG Inventory Reports
                  </Typography>
                </Grid>
                <Grid item className={classes.grid_item_title}>
                  <Typography
                    className={classes.title}
                  >{`${location?.client_loc_data?.client_loc_name}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            // aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              key={`report_expand`}
              onClick={handleClickExpand}
              sx={{
                padding: "20px",
              }}
            >
              <ListItemIcon>
                <img src={report_location_icon} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{
                    fontSize: 20,
                    fontFamily: "montserrat",
                    fontWeight: 700,
                    color: "#4690CD",
                  }}
                >
                  {location?.client_loc_data?.client_loc_name}
                </Typography>
              </ListItemText>
              {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expand} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {reports?.pdfRecords?.map((report, index) => {
                  return (
                    <ListItemButton
                      key={`report_download_${report.file_name}_${index}`}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        const anchor = document.createElement("a");
                        anchor.href = report.file_link;
                        anchor.download = report.file_name;
                        anchor.style.display = "none";
                        document.body.appendChild(anchor);
                        anchor.click();
                        document.body.removeChild(anchor);
                      }}
                    >
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          gap: 20,
                          width: "100%",
                        }}
                        className={classes.grid_row}
                      >
                        <Grid
                          item
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "20px",
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
                              background: "transparent",
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
                                style={{
                                  fontSize: 16,
                                  fontFamily: "montserrat",
                                  fontWeight: 400,
                                  color: "#4690CD",
                                }}
                              >
                                {report.file_name}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              style={{
                                width: "10%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                backgroundColor: "transparent",
                              }}
                            >
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={report.file_link}
                                download={report.file_name}
                              >
                                <DownloadIcon
                                  style={{
                                    color: "#4690CD",
                                  }}
                                />
                              </a>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

Reports.propTypes = {
  reports: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  location: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Reports;
