import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Providers from "./app/providers";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Home />
  </Providers>
);
