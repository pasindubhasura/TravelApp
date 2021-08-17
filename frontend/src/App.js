import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Destinations from "./components/pasindu/Destinations";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Route exact component={Destinations} path={"/destinations"}></Route>
    </Router>
  );
}
