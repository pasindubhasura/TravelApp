import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/Sidebar";
import Footer from "./components/Footer/Footer";
import "./App.css";

import './components/Home';

//travelVehicle
import AddVehicle from "./components/vehicle-lakshika/AddVehicle";
import ViewVehicle from "./components/vehicle-lakshika/ViewVehicles";
import EditVehicle from "./components/vehicle-lakshika/EditVehicle";
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
// import Services from "./components/pasindu/Services";

//Travel Accommodation
import AccommodationHome from "./components/Accommodation/AccommodationHome";
import Accommodation from "./components/Accommodation/Accommodation";
import AddAccommodation from "./components/Accommodation/AddAccommodation";
import EditAccommodation from "./components/Accommodation/EditAccommodation";
import Rooms from "./components/Accommodation/Rooms";
import AddRoom from "./components/Accommodation/AddRoom";
import EditRoom from "./components/Accommodation/EditRoom";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="page-container">
      <div className="container-wrap">
        <ToastContainer />
        <GlobalStyle />
        <Router>
          <NavBar />

          <Route path="/" component={Home} exact></Route>

          {/*Guides*/}
          <Route path="/get_guide" component={GuideHome} exact></Route>
          <Route path="/guide_add" component={AddGuide} exact></Route>
          <Route path="/guide_update/:id" component={UpdateGuide} exact></Route>
          <Route path="/guide/:id" component={GetindividualGuide} exact></Route>

          {/*Vehicle*/}
          <Route path={"/travelVehicle"} exact component={ViewVehicle} />
          <Route path={"/travelVehicle/add"} exact component={AddVehicle} />
          <Route path={"/travelVehicle/edit"} exact component={EditVehicle} />

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
          {/* <Route component={Services} exact path={"/services"} /> */}

          {/* Accommodation start*/}

          <Route
            path="/Accommodation_Home/"
            component={AccommodationHome}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Accommodation/"
            component={Accommodation}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Accommodation/add"
            component={AddAccommodation}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Accommodation/edit/:id"
            component={EditAccommodation}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Rooms/"
            component={Rooms}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Rooms/add"
            component={AddRoom}
            exact
          ></Route>
          <Route
            path="/Accommodation_Home/Rooms/edit/:id"
            component={EditRoom}
            exact
          ></Route>

          {/* Accommodation end */}
        </Router>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
