import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//travelVehicle
import viewPageVehicle from "./components/ViewVehicles";

export default function App() {
  return (
    <div className="App">
      <Router>
        {/*vehicles*/}
        <Route path="/viewVehicle" exact component={viewPageVehicle} />
      </Router>
    </div>
  );
}
