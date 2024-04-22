import React from "react";
import "./eula.css";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import { Document, Page, pdfjs } from "react-pdf";
import { axiosRootInstance } from "../../../../../Service/axios-instance";

const useStyles = makeStyles((theme) => ({
  organization_grid: { display: "flex", justifyContent: "center" },
}));

function Eula({}) {
  const { user } = useAuth0();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; // PDF viewer
  const classes = useStyles();
  const [eula, setEula] = React.useState(false);
  // EULA
  const [open, setOpen] = React.useState(true);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
    setEula(true);

    updateUserAuth0();
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [eulaChecked, setEulaChecked] = React.useState(false);

  const handleChange = (event) => {
    setEulaChecked(event.target.checked);
  };

  const updateUserAuth0 = () => {
    const updateUserAuth0Data = async () => {
      try {
        const url =
          process.env.REACT_APP_STAGE === "PRODUCTION"
            ? `/production-sc2-crud-auth0-user`
            : `/staging-sc2-crud-auth0-user`;

        // const response = await axiosBaseInstance.put("/customer/auth0", {
        const response = await axiosRootInstance.put(url, {
          user_id: user.sub,
          cust_org_id: user.cust_org_id,
          eula: 1,
          registrationStep: "eula",
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    updateUserAuth0Data();
  };

  return (
    <Dialog
      fullScreen={false}
      disableBackdropClick={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "60%",
          minWidth: "60%",
          borderRadius: 10,
        },
      }}
      style={{ overflowY: "hidden" }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography
          style={{
            fontSize: 20,
            fontFamily: "Montserrat",
            fontWeight: 900,
            color: "#4690cd",
          }}
        >
          End User License Agreement
        </Typography>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Document file="EULA_DRAFT.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {numPages > 0 &&
              Array.from(Array(numPages), (page, i) => {
                return (
                  <Page
                    style={{
                      width: "100%",
                    }}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    customTextRenderer={false}
                    key={`page_${i}`}
                    pageNumber={i + 1}
                  />
                );
              })}

            <div
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={eulaChecked}
                onChange={handleChange}
                inputProps={{ "aria-label": "eula checkbox" }}
              />
              <Typography
                style={{
                  fontSize: "16px !important",
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  color: eulaChecked ? "#4690cd" : "black",
                }}
              >
                I have read and agree to the terms and conditions of the End
                User License Agreement.
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Fade in={true} timeout={2000} key={"EULA"}>
                <Button size="lg">Continue</Button>
              </Fade>
            </div>
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Eula;
