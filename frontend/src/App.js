import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//travelVehicle
import viewPageVehicle from "./components/ViewVehicles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GuideHome from "./components/Guides/GuideHome";
import AddGuide from "./components/Guides/AddGuide";
import UpdateGuide from "./components/Guides/UpdateGuide";

export default function App() {
  return (
      <div className ="container">
        <ToastContainer />
        <Router>
          {/*Guides*/}
          <Route path="/get_guide" component = {GuideHome} exact></Route>
          <Route path="/guide_add" component = {AddGuide} exact></Route>
          <Route path="/guide_update/:id" component = {UpdateGuide} exact></Route>
          <Route path="/viewVehicle" exact component={viewPageVehicle} />
          {/* <Route path="/guide/:id" component = {GuideHome} exact></Route> */}
      </Router>
      </div>
  );
}
