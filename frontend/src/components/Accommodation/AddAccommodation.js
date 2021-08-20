import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AccStyles.css';


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

export default class AddAccommodation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            accommodationType:"",
            name:"",
            noOfRomm:Number,
            mobile:Number,
            formErrors: {
                name: "",
                noOfRomm: 0,
                mobile: 0
            }
        };
    }

    //handle input feild

    handleTypeChange=(e)=>{
        this.setState(
            {accommodationType: e.target.value});
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name =
                    value.trim().length < 5
                        ? "Minimum charachter must be 5"
                        : "";
                break;
                case "noOfRomm":
                    formErrors.noOfRomm =
                        value < 0
                            ? "Invalid Number !"
                            : "";
                    break;
                    case "mobile":
                        formErrors.mobile =
                            value.length > 10 || value.length < 10
                                ? "Mobile Number must have 10 digit"
                                : "";
                    break;
                default:
                    break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {

        e.preventDefault();
        if (formValid(this.state)) {

            const { accommodationType, name, noOfRomm, mobile } = this.state;
            const data = {
                accommodationType:accommodationType,
                name:name,
                noOfRomm:noOfRomm,
                mobile:mobile
            }
        //console.log(data)
        axios.post("http://localhost:8070/accommodation/add",data).then((res) => {
            if (res.data.success) {
                toast.success("Accommodation "+ this.state.name +" Added");
                this.setState(
                    {
                        accommodationType: "",
                        name: "",
                        noOfRomm: Number,
                        mobile: Number
                    }
                )
            } else {
                toast.error("You have an Error in Inserting");
            }
        });
    }
    else
        alert("Please Enter Details Correclty !");
    };


    render() {
        const { formErrors } = this.state; 
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10">
                        <div className="row">
                            <div className="col position-relative link">
                                <p><a href="/Accommodation_Home/">Accommodation Management</a> {'>'} <a href="/Accommodation_Home/Accommodation/">Accommodation</a> {'>'} Add Accommodation</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 position-relative">
                                <h2>Add Accommodation</h2>
                                <ToastContainer />
                            </div>
                            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                        </div>
                        <div className="shadowBoxForm">
                            <div className="row">
                                <div className="col-6 form">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Accommodation type : </label>
                                                <select id="type" className="form-control" name="type" onChange={this.handleTypeChange} value={this.state.accommodationType} required>
                                                    <option selected>Choose type...</option>
                                                    <option value="Hotel">Hotel</option>
                                                    <option value="Motels">Motels</option>
                                                    <option value="Gest House">Gest House</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Luxury Lodges">Luxury Lodges</option>
                                                </select>
                                            </div>
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Accommodation Name : </label>
                                                <input type="text" className="form-control" name="name" placeholder="#River side" value={this.state.name} onChange={this.handleInputChange}  required />
                                                {formErrors.name.length > 5 &&(
                                                    <p style={{color:'red'}} className="errorMessage">{formErrors.name}</p>
                                                )}                                                
                                            </div>                                         
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Number of Rooms : </label>
                                                <input type="number" className="form-control" name="noOfRomm" placeholder="#2" value={this.state.noOfRomm} onChange={this.handleInputChange}  required />
                                                {formErrors.noOfRomm < 1   ||(
											        <p style={{color:'red'}} className="errorMessage">{formErrors.noOfRomm}</p>
										        )}                                                                                                                                                 
                                            </div>                                                                                  
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Telephone Number : </label>
                                                <input type="number" className="form-control" id="mobile" name="mobile" placeholder="011456XXXX" value={this.state.mobile} onChange={this.handleInputChange}  required />
                                                {formErrors.mobile.length > 10  &&(
                                                    <p style={{color:'red'}} className="errorMessage">{formErrors.mobile}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group btndriver col-12" style={{ marginTop: '15px' }}>
                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                    <button type="submit" className="btn btn-success acc-button" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
                                                    <button type="reset" className="btn btn-primary acc-button"><i class="fas fa-eraser"></i>&nbsp;Clear</button>
                                                </div>
                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                    <a href="/Accommodation_Home/Accommodation/" className="btn btn-danger acc-button"><i className="fas fa-times"></i>&nbsp;Cancel</a>
                                                </div>
                                            </div>
                                            <div className="col-6" />
                                        </div>
                                    </form>
                                </div>
                                <div className="col-6 accImage">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        )
    }
}
