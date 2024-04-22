import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { getComparator, stableSort, checkConfidenceRange } from "./util.js";
import { COLUMNS } from "./constant.js";
import { axiosBaseInstance } from "../../../../Service/axios-instance.js";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    "& .MuiTablePagination-selectLabel": {
      fontSize: "12px !important",
    },

    "& .MuiTablePagination-displayedRows": {
      fontSize: "12px !important",
    },
  },
}));

const ExpenseTable = ({
  location,
  year,
  expenses,
  setFilteredExpenses,
  setGlobalExpense,
  setExpenseUpdated,
}) => {
  const classes = useStyles();
  const navigate = useNavigate({});
  //============================================================================
  // Table Util
  //============================================================================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onCellClick = (row, index) => {
    if (expenses && expenses.length > 0) {
      setGlobalExpense({
        expenses: filteredExpenseData,
        index: index,
        location: location,
        year: year,
      });
    }
  };

  const onArchiveClick = (row, index, archive) => {
    handleArchive(filteredExpenseData[index], archive);
  };

  const handleArchive = (singleExpense, archive) => {
    const handleArchiveSingleExpense = async () => {
      try {
        const response = await axiosBaseInstance.put(
          "/expense/archive",
          {
            archive: archive,
          },
          {
            params: {
              client_loc_id: singleExpense.client_loc_id,
              year: year,
              id: singleExpense._id,
            },
          },
        );
        setExpenseUpdated(true);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    handleArchiveSingleExpense();
  };

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(expenses, getComparator(order, orderBy), orderBy)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((obj) => obj.expense_data.date !== ""),
    [expenses, order, orderBy, page, rowsPerPage],
  );

  const filteredExpenseData = React.useMemo(
    () =>
      stableSort(expenses, getComparator(order, orderBy), orderBy).filter(
        (obj) => obj.expense_data.date !== "",
      ),
    [expenses, order, orderBy, page, rowsPerPage],
  );

  useEffect(() => {
    setFilteredExpenses(filteredExpenseData);
  }, [filteredExpenseData]);

  const [hoveredRow, setHoveredRow] = React.useState(null);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  useEffect(() => {
    const savedOrder = localStorage.getItem("expenseTableOrder") || "asc";
    const savedOrderBy = localStorage.getItem("expenseTableOrderBy") || "date";

    setOrder(savedOrder);
    setOrderBy(savedOrderBy);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseTableOrder", order);
    localStorage.setItem("expenseTableOrderBy", orderBy);
  }, [order, orderBy]);

  //============================================================================
  // Main Render
  //============================================================================
  return (
    <>
      <Grid
        item
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden", padding: 0 }}>
          {expenses.length > 0 && (
            <TableContainer
              sx={{
                "& .Mui-active ": {
                  color: "white !important",
                },
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                },
              }}
              className={classes.toolbar}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key={`TableRow`}>
                    <TableCell
                      key={`archive_header`}
                      align={"left"}
                      style={{
                        backgroundColor: "#4699cf",
                      }}
                    >
                      {""}
                    </TableCell>
                    {COLUMNS.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          backgroundColor: "#4699cf",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <TableSortLabel
                          sx={{
                            color: "white",
                          }}
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={createSortHandler(column.id)}
                        >
                          <Typography
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontFamily: "montserrat",
                              fontWeight: 900,
                              textAlign: "left",
                            }}
                          >
                            {column.label}
                          </Typography>
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell
                      key={`edit_header`}
                      align={"left"}
                      style={{
                        backgroundColor: "#4699cf",
                      }}
                    >
                      {""}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          style={{
                            background: row?.archive ? "grey" : "white",
                            opacity: row?.archive ? "0.5" : "1",
                          }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <TableCell
                            key={`archive_${row.code}`}
                            align={"left"}
                            sx={{
                              backgroundColor:
                                index === hoveredRow
                                  ? "#F8F8F8"
                                  : "transparent",
                            }}
                          >
                            <Tooltip
                              title={row.archive ? "Restore" : "Archive"}
                              placement="top"
                            >
                              <IconButton
                                onClick={() =>
                                  onArchiveClick(
                                    row,
                                    page * rowsPerPage + index,
                                    !row.archive,
                                  )
                                }
                                style={{
                                  backgroundColor: "transparent",
                                  padding: 5,
                                }}
                              >
                                {!row.archive ? (
                                  <RemoveCircleOutlineIcon
                                    style={{ padding: 3, fontSize: 20 }}
                                  />
                                ) : (
                                  <AddCircleOutlineIcon
                                    style={{ padding: 3, fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          {COLUMNS.map((column) => {
                            let value = row.expense_data[column.id];
                            let color = "black";
                            let weight = 500;
                            if (column.id === "CO2e_kg") {
                              value = row.ghg_data[column.id];
                              weight = 900;
                            }

                            if (
                              column.id === "confidence" &&
                              row.ghg_data[column.id]
                            ) {
                              let confidence = checkConfidenceRange(
                                row.ghg_data[column.id],
                              );
                              value = confidence.text;
                              color = confidence.color;
                              weight = 900;
                            }

                            if (
                              column.id === "scope" &&
                              row.ghg_data[column.id]
                            ) {
                              value = `Scope ${row.ghg_data[column.id]}`;
                              weight = 900;
                            }

                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  onCellClick(row, page * rowsPerPage + index)
                                }
                                sx={{
                                  backgroundColor:
                                    index === hoveredRow
                                      ? "#F8F8F8"
                                      : "transparent",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: 12,
                                    fontFamily: "montserrat",
                                    fontWeight: weight,
                                    color: color,
                                  }}
                                >
                                  {value}
                                </Typography>
                              </TableCell>
                            );
                          })}
                          <TableCell
                            key={`edit_${row.code}`}
                            align={"left"}
                            sx={{
                              backgroundColor:
                                index === hoveredRow
                                  ? "#F8F8F8"
                                  : "transparent",
                            }}
                          >
                            <Tooltip title="Edit Expense" placement="top">
                              <IconButton
                                disabled={row?.archive}
                                onClick={() =>
                                  onCellClick(row, page * rowsPerPage + index)
                                }
                                style={{
                                  backgroundColor: "transparent",
                                  padding: 5,
                                }}
                              >
                                <MdEdit style={{ padding: 3, fontSize: 20 }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={expenses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{
                  fontSize: 12,
                }}
                className={classes.toolbar}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

ExpenseTable.propTypes = {
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expenses: PropTypes.array,
  setFilteredExpenses: PropTypes.func.isRequired,
  setGlobalExpense: PropTypes.func.isRequired,
  setExpenseUpdated: PropTypes.func.isRequired,
};

export default ExpenseTable;
