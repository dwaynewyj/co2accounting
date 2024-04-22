import React from "react";
import ReactDOM from "react-dom/client";
import Auth0ProviderWithHistory from "./Component/Auth/auth0-provider-with-history";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.js";
import GooglePlacesProvider from "./Service/GooglePlacesProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Auth0ProviderWithHistory>
      <GooglePlacesProvider>
        <App />
      </GooglePlacesProvider>
    </Auth0ProviderWithHistory>
  </Router>,
);
