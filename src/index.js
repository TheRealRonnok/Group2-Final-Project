import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./components";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import Navbar from "./components/Navbar.js";
import Products from "./components/Products";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Navbar />

    {/* <Routes>
        <Route path="/users/login" element={<Login />} />
      </Routes> */}
    <App />
    {/* <Products /> */}
  </Router>
);
