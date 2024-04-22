import "@fontsource/montserrat";
import "./App.css";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

import { store, persistor } from "./Redux/Store/index";
import LogIn from "./Component/Auth/log-in.js";
import Main from "./Component/Main/main.js";
import SLayout from "./Component/Overview/slayout.js";
import ThemeProvider from "./Theme/theme-provider";
import { ProtectedRoute } from "./Route/protected-route.js";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const initialValue = () => {
    const config =
      process.env.REACT_APP_STAGE === "STAGING" ||
      process.env.NODE_ENV === "DEV"
        ? {
            site: process.env.REACT_APP_CHARGEBEE_TEST_SITE,
            publishableKey: process.env.REACT_APP_CHARGEBEE_TEST_API_KEY,
          }
        : {
            site: process.env.REACT_APP_CHARGEBEE_LIVE_SITE,
            publishableKey: process.env.REACT_APP_CHARGEBEE_LIVE_API_KEY,
          };

    window?.Chargebee?.init(config);

    let inactivityTimer = null;

    const handleInactivity = () => {
      // logout({ returnTo: process.env.REACT_APP_AUTH0_CALLBACK_URL });
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleInactivity, 900000); // 15 minutes in milliseconds
    };

    const resetTimerOnActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners for various user activities
    document.addEventListener("mousemove", resetTimerOnActivity);
    document.addEventListener("mousedown", resetTimerOnActivity);
    document.addEventListener("keypress", resetTimerOnActivity);
    document.addEventListener("touchstart", resetTimerOnActivity);

    // Start the inactivity timer
    resetInactivityTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimer);
      document.removeEventListener("mousemove", resetTimerOnActivity);
      document.removeEventListener("mousedown", resetTimerOnActivity);
      document.removeEventListener("keypress", resetTimerOnActivity);
      document.removeEventListener("touchstart", resetTimerOnActivity);
    };
  };

  useEffect(() => {
    initialValue();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/" element={<LogIn />} />
            <Route
              key={"main"}
              exact
              path="/main"
              // element={<Main />}
              element={<ProtectedRoute component={Main} />}
            />
            <Route
              key={"clients"}
              exact
              path="/clients"
              // element={<Main />}
              element={<ProtectedRoute component={Main} />}
            />
            <Route
              key={"overview"}
              exact
              path="/overview"
              element={<ProtectedRoute component={SLayout} />}
              // element={<SLayout />}
            />
            <Route path="/*" element={<ProtectedRoute component={Main} />} />
          </Routes>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
export default App;

// <Router>
//   <Auth0ProviderWithHistory>
//     <Provider store={store}>
//       <ThemeProvider>
//         <PersistGate loading={null} persistor={persistor}>

// import { useAuth0 } from "@auth0/auth0-react";
//
// const { logout } = useAuth0();
//
// logout({
//   returnTo: window.location.origin,
// });
