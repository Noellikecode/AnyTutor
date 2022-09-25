import React from "react";
import ReactDOM from "react-dom";
import { HMSRoomProvider, HMSThemeProvider } from "@100mslive/hms-video-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <HMSRoomProvider>
      <HMSThemeProvider appBuilder={{ theme: "dark" }}>
        <App />
      </HMSThemeProvider>
    </HMSRoomProvider>
  </BrowserRouter>,
  rootElement
);
