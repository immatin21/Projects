import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-3viemz58uzuxiz8g.us.auth0.com";
const clientId = "62CXtmTbY1j0wujFaotEJpjkGvdRotkS";

createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </>
);
