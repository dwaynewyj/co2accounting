import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";

const useStyles = makeStyles({
  root: {
    border: "1px solid rgba(24, 33, 77, 0.2)",
    borderRadius: 4,
    padding: 6,
    flexWrap: "nowrap !important",
    width: "100%",
  },
  file_icon: {
    width: 20,
    margin: "0 10px 0 10px",
  },
  download_button: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    margin: 5,
  },
  delete_icon: {
    width: 17,
  },
  name: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "black",
  },
});

const FileDeleteChip = ({ file, onRemove }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingRight: 10,
          gap: 10,
        }}
      >
        <DescriptionIcon style={{ padding: 3, color: "black" }} />
        <Typography className={classes.name}>{file.name}</Typography>
      </Grid>

      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            minWidth: 10,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(file);
          }}
        >
          <RemoveCircleOutlineIcon style={{ padding: 3, color: "white" }} />
        </Button>
      </Grid>
    </Grid>
  );
};

FileDeleteChip.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FileDeleteChip;
