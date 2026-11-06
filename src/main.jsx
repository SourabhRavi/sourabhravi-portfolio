import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAnalytics } from "./analytics.js";
import "./styles.css";
import "lenis/dist/lenis.css";

initAnalytics();

createRoot(document.getElementById("root")).render(<App />);
