import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { COLUMNS } from "../ExpenseTable/constant.js";
import CreateSingleExpenseCard from "./create-single-expense-card.js";
import { axiosBaseInstance } from "../../../../Service/axios-instance.js";

const SINGLE_EXPENSE_TEMPLATE = COLUMNS.reduce((obj, column) => {
  if (column.input) {
    obj[column.id] = null;
  }
  return obj;
}, {});

function CreateSingleExpense({
  location,
  year,
  filteredExpenses,
  open,
  setOpen,
  setExpenseUpdated,
}) {
  const { user } = useAuth0();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [singleExpense, setSingleExpense] = useState(SINGLE_EXPENSE_TEMPLATE);

  useEffect(() => {
    setSingleExpense(SINGLE_EXPENSE_TEMPLATE);
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createSingleExpense = () => {
    const createSingleExpenseData = async () => {
      try {
        const response = await axiosBaseInstance.post("/expense/single", {
          user_id: user.sub,
          client_loc_id: location._id,
          year: year,
          ...singleExpense,
        });
        if (response?.data?.expense) {
          setExpenseUpdated(true);
          setOpen(false);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    createSingleExpenseData();
  };

  const handleCreateSingleExpense = () => {
    createSingleExpense();
  };

  const requiredLocationFields = Object.keys(SINGLE_EXPENSE_TEMPLATE);

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
            Add Single Expense
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
              <CreateSingleExpenseCard
                year={year}
                singleExpense={singleExpense}
                setSingleExpense={setSingleExpense}
              />
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
                  !(
                    singleExpense &&
                    isFieldsNotEmpty(singleExpense, requiredLocationFields)
                  )
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
                onClick={() => handleCreateSingleExpense()}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateSingleExpense.propTypes = {
  location: PropTypes.object.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setOpen: PropTypes.func.isRequired,
  setExpenseUpdated: PropTypes.func.isRequired,
};

export default CreateSingleExpense;
