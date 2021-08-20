import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../../images/Logo.png";
import "../../css/IT19140162.css";

export default class ViewVehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: [],
    };
  }

  //export PDF.
  componentDidMount() {
    this.retrieveVehicle();
  }

  retrieveVehicle() {
    axios.get(`http://localhost:5001/vehicles`).then((res) => {
      if (res.data.success) {
        this.setState({
          vehicle: res.data.existingVehicle,
        });
        console.log(this.state.vehicle);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5001/vehicle/delete/${id}`).then((res) => {
      toast("Vehicle Deleted Successfully", {
        type: toast.TYPE.ERROR,
        autoClose: 4000,
      });
      this.retrieveVehicle();
    });
  };

  filterData(vehicle, searchKey) {
    const result = guide.filter(
      (vehicle) =>
        vehicle.vehicleType.toLowerCase().includes(searchKey) ||
        vehicle.vehicleLocation.toLowerCase().includes(searchKey) ||
        vehicle.vehiclePricePerkm.toLowerCase().includes(searchKey) ||
        vehicle.vehiclePhone.toLowerCase().includes(searchKey) ||
        vehicle.vehicleAvailability.toLowerCase().includes(searchKey)
    );
    this.setState({ vehicle: result });
  }

  handleSearchVehicle = (e) => {
    // console.log(e.currentTarget.value);
    const searchKey = e.currentTarget.value;
    axios.get(`http://localhost:5001/vehicles`).then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingVehicle, searchKey);
      }
    });
  };

  exportPDF = () => {
    // let bodyData = [];
    // let length = guide.length;
    // let x = 1;
    // console.log(guide);
    const data = this.state.guide.map((vehiclesPdf) => [
      vehiclesPdf.vehicleType,
      vehiclesPdf.vehicleLocation,
      vehiclesPdf.vehiclePricePerkm,
      vehiclesPdf.vehiclePhone,
      vehiclesPdf.vehicleAvailability,
    ]);
    // for (let i = 0; i < length; i++) {
    //   bodyData.push([
    //     x++,
    //     guide[i].registrationNo,
    //     guide[i].name,
    //     guide[i].address,
    //     guide[i].email,
    //     guide[i].phoneNo,
    //     guide[i].language,
    //     guide[i].availability,
    //   ]);
    // }
    // //save json data to bodydata in order to print in the pdf table

    const doc = new jsPDF({ orientation: "portrait" });
    var time = new Date().toLocaleString();
    doc.setFontSize(27);
    doc.text(`Guide Details Report`, 105, 35, null, null, "center");
    doc.setFontSize(10);
    doc.text(`(Generated on ${time})`, 105, 39, null, null, "center");
    doc.setFontSize(14);
    // doc.text("Thilina Hardware", 105, 20, null, null, "center");
    // doc.text("No 55, Main Road, Horana", 105, 25, null, null, "center");
    doc.addImage(Logo, "JPEG", 90, 0, 25, 25);
    doc.autoTable({
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: "#38B000" },
      startY: 44,
      head: [
        ["Vehicle Type", "Location", "Price Per km", "Phone", "Availability"],
      ],
      body: data,
    });
    doc.save("Vehicles.pdf");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"></div>
          <div className="col-lg-3 mt-2 mb-2 ">
            <input
              className="form-control"
              type="search"
              placeholder="🔍 Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>
        <div className="py-4">
          <h1>Vehicles</h1>

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              {/* add button  */}
              <Link to="/vehicle_add" className="btn btn-warning">
                <i className="fas fa-user-plus"></i>&nbsp;Add Vehicle
              </Link>
              &nbsp;
              <Link
                onClick={() => this.exportPDF()}
                to="#"
                className="btn btn-success"
              >
                <i class="fas fa-download"></i>&nbsp;Download Report
              </Link>
            </div>
          </div>

          <table class=" table table-striped borde">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vehicle Type </th>
                <th scope="col">Location</th>
                <th scope="col">Price per KM</th>
                <th scope="col">PhoneNo</th>
                <th scope="col">Availability</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vehicle.map((vehicle, index) => (
                <tr key={index}>
                  <th scope="row">G{index + 1}</th>
                  <td>
                    <a
                      href={`/vehicle/${vehicle._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {vehicle.registrationNo}
                    </a>
                  </td>

                  <td>{vehicle.type}</td>
                  <td>{vehicle.location}</td>
                  <td>{vehicle.price}</td>
                  <td>{vehicle.phoneNo}</td>
                  <td>{vehicle.availability}</td>

                  <td>
                    <Link
                      className="btn btn-outline-warning"
                      to={`/vehicle_update/${vehicle._id}`}
                    >
                      <i className="fas fa-edit"></i> &nbsp;Update
                    </Link>
                    &nbsp;
                    <Link
                      className="btn btn-danger"
                      onClick={() => this.onDelete(vehicle._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
