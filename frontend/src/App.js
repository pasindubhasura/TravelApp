import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Destinations from "./components/pasindu/Destinations";
import AddDestinationForm from "./components/pasindu/AddDestinationForm";
import EditDestinationForm from "./components/pasindu/EditDestinationForm";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Route exact component={Destinations} path={"/destinations"} />
      <Route exact component={AddDestinationForm} path={"/destinations/add"} />
      <Route
        exact
        component={EditDestinationForm}
        path={"/destinations/edit"}
      />
    </Router>
  );
}
