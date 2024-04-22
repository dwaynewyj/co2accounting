import * as React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const InputOption = React.memo(function InputOption({ option }) {
  const classes = useStyles();

  const matches = option?.structured_formatting?.main_text_matched_substrings;

  if (!matches) {
    return null;
  }

  const parts = parse(
    option.structured_formatting?.main_text ?? "",
    matches.map((match) => [match.offset, match.offset + match.length]),
  );

  return (
    <Grid container alignItems="center">
      <Grid item>
        <LocationOnIcon className={classes.icon} fontSize="small" />
      </Grid>

      <Grid item xs>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}

        <Typography variant="body2" color="textSecondary">
          {option.structured_formatting?.secondary_text}
        </Typography>
      </Grid>
    </Grid>
  );
});

InputOption.propTypes = {
  option: PropTypes.object.isRequired,
};

export default InputOption;
