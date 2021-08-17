import React, { useState } from "react";
// import axios from "axios";
// import {Link} from 'react-router-dom';
import "./../css/IT19140162.css";

export default function AddVehicles() {
  return (
    <div className="container">
      <div className="it19140162-topic">
        <p className="it19140162-topic-p">Transport</p>
      </div>
      <br />

      <div className="it19140162-mainDiv">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Location</th>
              <th scope="col">Price Per KM</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Availability</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
