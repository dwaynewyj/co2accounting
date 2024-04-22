import * as React from "react";
const placesContext = React.createContext();
const placesAPIKey = "AIzaSyDoZ2zUUkM1pUS4FdAM2qZPYkHxcHgTKyg";
const placesScriptId = "google-places-link";

let google;

const loadGooglePlacesScript = (function init() {
  const isLoaded = Boolean(google);

  return function loader() {
    if (isLoaded) {
      return Promise.resolve(google);
    }

    return new Promise((resolve, reject) => {
      if (document.getElementById(placesScriptId) && google) {
        return resolve(google);
      }

      if (document.getElementById(placesScriptId) && !google) {
        document.getElementById(placesScriptId).remove();
      }

      const scriptTag = document.createElement("script");

      scriptTag.id = placesScriptId;
      scriptTag.type = "text/javascript";
      scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${placesAPIKey}&libraries=places`;
      scriptTag.async = true;

      scriptTag.onerror = reject;

      scriptTag.onload = () => {
        google = window.google;
        return resolve(google);
      };

      document.head.append(scriptTag);
    });
  };
})();

export default function GooglePlacesProvider({ children }) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    let active = true;

    loadGooglePlacesScript()
      .then((google) => active && setValue(google))
      .catch(console.error("error"));

    return () => {
      active = false;
    };
  }, []);

  return (
    <placesContext.Provider value={value}>{children}</placesContext.Provider>
  );
}

export function useGooglePlaces() {
  const google = React.useContext(placesContext);
  const [autocompleteService, setAutocompleteService] = React.useState(null);
  const [placeService, setPlaceService] = React.useState(null);

  const getPlacePredictions = React.useCallback(
    async ({ input, country }) => {
      return new Promise((resolve) => {
        let ac = autocompleteService;

        if (!ac && google) {
          ac = new google.maps.places.AutocompleteService();
        }

        if (!ac && !google) {
          resolve([]);
        } else {
          setAutocompleteService(ac);
          ac.getPlacePredictions(
            { input, componentRestrictions: { country }, types: ["address"] },
            (results) => resolve(results ?? []),
          );
        }
      });
    },
    [google, autocompleteService],
  );

  const getPlace = React.useCallback(
    async ({ placeId }) => {
      return new Promise((resolve) => {
        let ps = placeService;

        if (!ps && google) {
          ps = new google.maps.places.PlacesService(
            document.createElement("div"),
          );
        }

        if (!ps && !google) {
          resolve({});
        } else {
          setPlaceService(ps);
          ps.getDetails({ placeId }, (result) =>
            resolve(formatPlaceResult(result) ?? {}),
          );
        }
      });
    },
    [google, placeService],
  );

  React.useEffect(() => {
    if (!autocompleteService && google) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
    }

    if (!placeService && google) {
      setPlaceService(
        new google.maps.places.PlacesService(document.createElement("div")),
      );
    }
  }, [google, autocompleteService, placeService]);

  return React.useMemo(() => {
    return {
      google,
      autocomplete: autocompleteService,
      places: placeService,
      getPlacePredictions,
      getPlace,
      addressComponentsFor,
      formatPlaceResult,
    };
  }, [
    google,
    autocompleteService,
    placeService,
    getPlacePredictions,
    getPlace,
  ]);
}

export function formatPlaceResult(placeResult) {
  const [type] = placeResult.types;

  return {
    type,
    name: placeResult.name,
    placeId: placeResult.place_id,
    formattedAddress: placeResult.formatted_address,
    addressComponents: addressComponentsFor(placeResult),
  };
}

export function addressComponentsFor(placeResult) {
  return placeResult.address_components.reduce((result, component) => {
    const [type] = component.types;

    switch (type) {
      case "street_number": {
        const existingAddress = result.address;

        result.address = Boolean(existingAddress)
          ? `${component.long_name} ${result.address}`
          : component.long_name;
        break;
      }
      case "route": {
        const existingAddress = result.address;

        result.address = Boolean(existingAddress)
          ? `${result.address} ${component.short_name}`
          : component.short_name;
        break;
      }
      case "country": {
        result.country = component.long_name;
        break;
      }
      case "postal_code": {
        result.zipCode = `${component.long_name}${result.zipCode ?? ""}`;
        break;
      }
      case "postal_code_suffix": {
        result.zipCode = `${result.zipCode ?? ""}-${component.long_name}`;
        break;
      }
      case "postal_town": {
        result.city = component.long_name;
        break;
      }
      case "sublocality": {
        result.city = component.long_name;
        break;
      }
      case "sublocality_level_1": {
        result.city = component.long_name;
        break;
      }
      case "locality": {
        result.city = component.long_name;
        break;
      }
      case "administrative_area_level_1": {
        result.state = component.short_name;
        break;
      }
      default:
        break;
    }

    return result;
  }, {});
}
