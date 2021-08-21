import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../images/defaultImage.jpg";

const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: "",
      location: "",
      price: Number,
      phone: "",
      availability: "",

      formErrors: {
        phone: "",
      },
    };
  }

  handleInputChange = (e) => {
    // validate
    const { phone, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (phone) {
      case "phone":
        formErrors.phone =
          value.length < 10 || value.length > 10
            ? "Please Enter A Valid Phone Number"
            : "";
      default:
        break;
    }
    this.setState({ formErrors, [phone]: value }, () =>
      console.log(this.state)
    );

    this.setState({
      ...this.state,
      [phone]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const { vehicleType, location, price, phone, availability } = this.state;

      const data = {
        vehicleType: vehicleType,
        location: location,
        price: price,
        phone: phone,
        availability: availability,
      };
      console.log(data);
      axios.post("http://localhost:5001/vehicle/add", data).then((res) => {
        if (res.data.success) {
          toast(`Vehicle Added Successfully`, {
            type: toast.TYPE.SUCCESS,
            autoClose: 4000,
          });
          this.setState({
            vehicleType: "",
            location: "",
            price: Number,
            phone: "",
            availability: "",
          });
        }
      });
    } else {
      toast(`Plaese fill out the field. `, {
        type: toast.TYPE.ERROR,
        autoClose: 4000,
      });
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="container">
        <div className="row ">
          <div className="col-6 shadowBox">
            <center>
              <h1 className="h3 mb-3 font-weight-normal head-line">
                Add New Vehicle
              </h1>
            </center>

            <form className="needs-validation " noValidate>
              {/* V Type */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Vehicle Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="vehicleType"
                  placeholder="Enter Vehicle Type"
                  value={this.state.vehicleType}
                  onChange={this.handleInputChange}
                />
              </div>

              {/* Location */}

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter Loccation"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                />
              </div>

              {/* Email */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Email</label>
                <input
                  type="email"
                  className={
                    formErrors.email.length > 0 ? "error" : "form-control"
                  }
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                {formErrors.email.length > 0 && (
                  <span
                    style={{ color: "red", fontWeight: "bold" }}
                    className="errorMessage"
                  >
                    {formErrors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Phone No</label>
                <input
                  type="number"
                  className="form-control"
                  name="phoneNo"
                  placeholder="Enter PhoneNo"
                  value={this.state.phoneNo}
                  onChange={this.handleInputChange}
                />

                {formErrors.phoneNo.length > 10 && (
                  <span style={{ color: "red" }} className="errorMessage">
                    {formErrors.phoneNo}
                  </span>
                )}
              </div>

              {/* Language */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Language</label>
                <select
                  id="language"
                  className="form-control"
                  name="language"
                  onChange={this.handleInputChange}
                  value={this.state.language}
                  required
                >
                  <option selected>Choose Language</option>
                  <option value="English">English</option>
                  <option value="Tamil,English">Tamil,English</option>
                  <option value="German,English">German,English </option>
                  <option value="French,English">French,English </option>
                </select>
                {/* <input type="text"
                                    className="form-control"
                                    name="language"
                                    placeholder="Enter Language"
                                    value={this.state.language}
                                    onChange={this.handleInputChange} /> */}
              </div>

              {/* availability */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Availability</label>
                <select
                  id="availability"
                  className="form-control"
                  name="availability"
                  onChange={this.handleInputChange}
                  value={this.state.availability}
                  required
                >
                  <option selected>Choose Availability</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>

                {/* <input type="text"
                                    className="form-control"
                                    name="availability"
                                    placeholder="Enter Availability"
                                    value={this.state.availability}
                                    onChange={this.handleInputChange} /> */}
              </div>

              <div>
                <button
                  href="/guide_add"
                  type="submit"
                  className="btn btn-outline-success sub_btn2"
                >
                  <i class="far fa-times-circle"></i>&nbsp;Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary sub_btn"
                  onClick={this.onSubmit}
                >
                  <i class="far fa-save"></i>&nbsp;Add
                </button>
              </div>
            </form>
          </div>
          <div className="col-6">
            <img className="add_img" src={defaultImage} />
          </div>
        </div>
      </div>
    );
  }
}
