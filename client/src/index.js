import React from "react";
import reactDOM from "react-dom/client";
import App from "./components/App.js";

const Root = reactDOM.createRoot(document.querySelector("#root"));
Root.render(<App />);
