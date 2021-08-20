import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar/Sidebar';
import Footer from './components/Footer/Footer';
import './App.css';

//travelVehicle
import viewPageVehicle from "./components/ViewVehicles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GuideHome from "./components/Guides/GuideHome";
import AddGuide from "./components/Guides/AddGuide";
import UpdateGuide from "./components/Guides/UpdateGuide";
import GetindividualGuide from "./components/Guides/GetindividualGuide";

//travelDestinations
import Destinations from "./components/pasindu/Destinations";
import AddDestinationForm from "./components/pasindu/AddDestinationForm";
import EditDestinationForm from "./components/pasindu/EditDestinationForm";

export default function App() {
  return (

    <div className="page-container">
    <div className="container-wrap">
      <ToastContainer />
      <GlobalStyle />
      <Router>
         <NavBar />
        {/*Guides*/}
        <Route path="/get_guide" component={GuideHome} exact></Route>
        <Route path="/guide_add" component={AddGuide} exact></Route>
        <Route path="/guide_update/:id" component={UpdateGuide} exact></Route>
        <Route path="/guide/:id" component = {GetindividualGuide} exact></Route>
        
        {/*Vehicle*/}
        <Route path="/viewVehicle" exact component={viewPageVehicle} />

        {/* travelDestinations */}
        <Route exact component={Destinations} path={"/destinations"} />
        <Route
          exact
          component={AddDestinationForm}
          path={"/destinations/add"}
        />
        <Route
          exact
          component={EditDestinationForm}
          path={"/destinations/edit"}
        />
        
         
      </Router>
      </div>
      {/* footer */}
      <Footer/>
    </div>
  );
}
