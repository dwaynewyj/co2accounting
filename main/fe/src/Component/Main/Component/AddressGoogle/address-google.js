import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Autocomplete } from "@mui/material";
import styled from "styled-components";
import InputOption from "./input-option.js";
import { useGooglePlaces } from "../../../../Service/GooglePlacesProvider.jsx";

export const inputValidation = {
  firstName: {
    autoComplete: "given-name",
    name: "firstName",
    minLength: 1,
    maxLength: 40,
  },
  lastName: {
    autoComplete: "family-name",
    name: "lastName",
    minLength: 1,
    maxLength: 40,
  },
  instagramHandle: { maxLength: 25 },
  email: { autoComplete: "email", name: "email", minLength: 4, maxLength: 80 },
  phoneNumber: {
    autoComplete: "tel",
    name: "phoneNumber",
    minLength: 4,
    maxLength: 25,
  },
  address: {
    autoComplete: "address-line1",
    name: "address",
    minLength: 2,
    maxLength: 80,
  },
  city: {
    autoComplete: "address-level2",
    name: "city",
    minLength: 2,
    maxLength: 80,
  },
  state: {
    autoComplete: "address-level1",
    name: "state",
    minLength: 2,
    maxLength: 80,
  },
  zipCode: {
    autoComplete: "postal-code",
    name: "zipCode",
    minLength: 2,
    maxLength: 40,
  },
  country: { autoComplete: "country", name: "country" },
  caption: { maxLength: 255 },
};

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: black;
  }
  & .MuiOutlinedInput-root {
    font-size: 12px;
    font-family: montserrat;
    font-weight: 700;
    &.Mui-focused fieldset {
      border-color: grey;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-radius: 10px;
  }
`;

const AddressGoogle = React.memo(function AddressGoogle({
  address,
  setAddress,
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const lastInputValue = useRef("");

  const { getPlacePredictions, getPlace } = useGooglePlaces();

  const onInputChange = (_, newInputValue) => {
    lastInputValue.current = inputValue;

    setInputValue(newInputValue);
    if (!newInputValue || newInputValue === "") {
      setAddress(null);
    }
  };

  const onValueChange = (_, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    if (newValue) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return;
    }
    getPlacePredictions({
      input: inputValue,
      // country: "CA",
    }).then((results) => {
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, getPlacePredictions]);

  useEffect(() => {
    if (value && typeof value !== "string") {
      getPlace({ placeId: value.place_id }).then((result) => {
        let { address, city, state, zipCode, country } =
          result.addressComponents;
        setAddress({
          address,
          city,
          state,
          zip: zipCode,
          country,
        });
      });
    }
  }, [value, getPlace]);

  function getOptionLabel(option) {
    if (typeof option === "string") {
      return option;
    }
    if (option.structured_formatting) {
      return `${option.structured_formatting.main_text}, ${option.structured_formatting.secondary_text}`;
    }
    if (option.description) {
      const [firstPart] = option.description.split(",");
      return firstPart;
    }
    return "";
  }

  return (
    <Autocomplete
      selectOnFocus
      handleHomeEndKeys
      autoComplete
      freeSolo
      includeInputInList
      filterSelectedOptions
      id="google-places-input"
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      options={options}
      value={value}
      size={"medium"}
      onChange={onValueChange}
      onInputChange={onInputChange}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <StyledTextField
          label=""
          placeholder={address ?? ""}
          multiline
          autoComplete="off"
          {...params}
          inputProps={{
            ...params.inputProps,
            ...inputValidation.address,
            autoComplete: "off",
          }}
          fullWidth
          variant="outlined"
          size={"medium"}
          style={{ height: "100%", width: "100%", paddingBottom: 10 }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <InputOption option={option} />
        </li>
      )}
    />
  );
});

AddressGoogle.propTypes = {
  address: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined]),
  ]),
  setAddress: PropTypes.func.isRequired,
};

export default AddressGoogle;
