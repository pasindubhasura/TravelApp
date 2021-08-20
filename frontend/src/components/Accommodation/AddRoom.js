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


export default class AddRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accommodations: [],
            accName: "",
            roomNo: Number,
            noOfBeds: Number,
            airCondition: "",
            price: Number,
            description: "",
            formErrors: {
                roomNo: 0,
                noOfBeds: 0,
                airCondition: "",
                price: 0,
                description: ""                    
            }
        }
    }    

    //handle input feild

    handleNameChange = (e) => {
        this.setState({ accName: e.target.value });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "roomNo":
                formErrors.roomNo =
                    value.length < 5
                        ? "Minimum Digits must be 5"
                        : "";
                break;
                case "noOfBeds":
                    formErrors.noOfBeds =
                        value < 0
                            ? "Invalid Number !"
                            : "";
                    break;
                    case "airCondition":
                        formErrors.airCondition =
                            value < 0
                                ? "You haven't choose Air Condition type !"
                                : "";
                        case "price":
                            formErrors.price =
                            value < 0
                                    ? "Price cannot be a negative value !"
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

    //calling the accommodation api
    componentDidMount() {
        this.retrieveAccommodations();
    }    

    //display accommdation
    retrieveAccommodations() {
        axios.get('http://localhost:8070/accommodation/').then(res => {
            if (res.data.success) {
                this.setState({
                    accommodations: res.data.existingAccommodations
                });
                console.log(this.state.accommodations)
            }
        });
    }    

    onSubmit = (e) => {

        e.preventDefault();
        if (formValid(this.state)) {
            const { accName, roomNo, noOfBeds, airCondition, price, description } = this.state;
            const data = {
                accName: accName,
                roomNo: roomNo,
                noOfBeds: noOfBeds,
                airCondition: airCondition,
                price: price,
                description: description
            }
        //console.log(data)
        axios.post("http://localhost:8070/room/add", data).then((res) => {
            if (res.data.success) {
                toast.success('Room no ' + this.state.roomNo + ' added Successful !');
                this.setState(
                    {
                        accName: "",
                        roomNo: Number,
                        noOfBeds: Number,
                        airCondition: "",
                        price: Number,
                        description: ""
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
                    <div className="col-2" />
                    <div className="col-10">
                        <div className="row">
                            <div className="col position-relative link">
                                <p><a href="/Accommodation_Home/">Accommodation Management</a> {'>'} <a href="/Accommodation_Home/Rooms/">Rooms</a> {'>'} Add Room</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 position-relative">
                                <h2>Add Room</h2>
                                <ToastContainer />
                            </div>
                            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                        </div>
                        <div className="shadowBoxForm">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-6 form">
                                        <div className="form-row">
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Accommodation Name : </label>
                                                <select id="type" className="form-control" name="type" onChange={this.handleNameChange} value={this.state.accName} style={{ marginTop: '10px' }} required>
                                                    <option selected>Choose accommodation...</option>
                                                    {this.state.accommodations.map((accommodations) => (
                                                        <option value={accommodations.name} required>{accommodations.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Room No : </label>
                                                <input type="text" className="form-control" name="roomNo" placeholder="10XXX" onChange={this.handleInputChange} value={this.state.roomNo} style={{ marginTop: '10px' }} required />
                                                {formErrors.roomNo < 5 ||(
                                                    <p style={{color:'red'}} className="errorMessage">{formErrors.roomNo}</p>
                                                )}                                                
                                            </div>
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Number of Beds : </label>
                                                <input type="number" className="form-control" name="noOfBeds" placeholder="2" value={this.state.noOfBeds}  onChange={this.handleInputChange} style={{ marginTop: '10px' }} required />
                                                {formErrors.noOfBeds < 1   ||(
											        <p style={{color:'red'}} className="errorMessage">{formErrors.noOfBeds}</p>
										        )}                                                
                                            </div>
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Air Condition : </label>
                                            </div>
                                            <div className="radio">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="airCondition" id="condition" onChange={this.handleInputChange} value="AC" style={{ marginTop: '10px' }} required />
                                                    <label class="form-check-label" for="inlineRadio1">AC</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="airCondition" id="condition" onChange={this.handleInputChange} value="Non-AC" style={{ marginTop: '10px' }} required />
                                                    <label class="form-check-label" for="inlineRadio2">Non-AC</label>
                                                </div>
                                                {formErrors.airCondition < 1   ||(
											        <p style={{color:'red'}} className="errorMessage">{formErrors.airCondition}</p>
										        )}  
                                            </div>
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Price per Day : </label>
                                            </div>
                                            <div class="input-group col" style={{ marginTop: '15px' }}>
                                                <span class="input-group-text">Rs:</span>
                                                <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" name="price" placeholder="XXX" value={this.state.price} onChange={this.handleInputChange}  required />
                                                <span class="input-group-text">.00</span>
                                            </div>
                                                {formErrors.price < 1   ||(
											        <p style={{color:'red'}} className="errorMessage">{formErrors.price}</p>
										        )}   
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Description : </label>
                                                <textarea class="form-control" aria-label="With textarea" name="description" placeholder="XXXXXXXXX" value={this.state.description}  onChange={this.handleInputChange} style={{ marginTop: '10px' }} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group btndriver col-12" style={{ marginTop: '15px' }}>
                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                    <button type="submit" className="btn btn-success acc-button" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
                                                    <button type="reset" className="btn btn-primary acc-button"><i class="fas fa-eraser"></i>&nbsp;Clear</button>
                                                </div>
                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                    <a href="/Accommodation_Home/Rooms/" className="btn btn-danger acc-button"><i className="fas fa-times"></i>&nbsp;Cancel</a>
                                                </div>
                                            </div>
                                            <div className="col-6" />
                                        </div>
                                    </div>
                                    <div className="col-6 accRoomImage">
                                        <img src="/images/placeholder.png" />
                                        <div className="row" style={{ marginTop: '50px', maxWidth: '525px' }}>
                                            <div class="input-group mb-3">
                                                <input type="file" class="form-control" id="inputGroupFile02" style={{ borderRadius: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
