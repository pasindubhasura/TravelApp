import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import defaultImage from "../../images/placeholder.png";
import { storage } from "../../firebase";
import Progress from "./Progress";
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

export default class EditRoom extends Component {

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
            availability: "",
            //Firebase Image Upload States
            file: null,
            uploadPercentage: 0,
            NoItemImg: defaultImage,
            image: "",            
            formErrors: {
                roomNo: 0,
                noOfBeds: 0,
                airCondition: "",
                price: 0,
                description: ""                    
            }
        }
    }  

    // Upload Image
    uploadImage(e) {
        if (e.target.files[0] !== null) {
            const uploadTask = storage
                .ref(`products/${e.target.files[0].name}`)
                .put(e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //progress function
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ uploadPercentage: progress });
                },
                (error) => {
                    //error function
                    console.log(error);
                },
                () => {
                    //complete function
                    storage
                        .ref("products")
                        .child(e.target.files[0].name)
                        .getDownloadURL()
                        .then((url) => {
                            console.log(url);
                            this.setState({ image: url });
                        });
                }
            );
        } else {
            alert("Error Upload Image First")
        }
    }


    //handle input feild

    handleNameChange = (e) => {
        this.setState({ accName: e.target.value });
    }

    handleAvailabilityChange = (e) => {
        this.setState({ availability: e.target.value });
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
    

    //display accommdation
    retrieveAccommodations() {
        axios.get('http://localhost:5001/accommodation/').then(res => {
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
            const id = this.props.match.params.id;
            const { accName, roomNo, noOfBeds, airCondition, price, description, availability, image } = this.state;
            const data = {
                accName: accName,
                roomNo: roomNo,
                noOfBeds: noOfBeds,
                airCondition: airCondition,
                price: price,
                description: description,
                availability: availability,
                image: image
            }
        //console.log(data)
        axios.put(`http://localhost:5001/room/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast.success('Room no ' + this.state.roomNo + ' Update Successfully !');
                this.setState(
                    {
                        accName: "",
                        roomNo: Number,
                        noOfBeds: Number,
                        airCondition: "",
                        price: Number,
                        description: "",
                        availability: ""
                    }
                )
            } else {
                toast.error("You have an Error in Updating");
            }
        });
    }
    else
        alert("Please Enter Details Correclty !");
    };    
    
    //calling the accommodation api
    componentDidMount() {
        //retrieve  Accommodations name
        this.retrieveAccommodations();
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5001/room/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    accName: res.data.room.accName,
                    roomNo: res.data.room.roomNo,
                    noOfBeds: res.data.room.noOfBeds,
                    airCondition: res.data.room.airCondition,
                    price: res.data.room.price,
                    description: res.data.room.description,
                    availability: res.data.room.availability,
                    image: res.data.room.image
                });
                console.log(this.state.room);
            }
        });
    }   

    render() {
        const { formErrors } = this.state; 
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-2" />
                    <div className="col-10">
                        <div className="row">
                            <div className="col position-relative link">
                            <p><a href="/Accommodation_Home/">Accommodation Management</a> {'>'} <a href="/Accommodation_Home/Rooms/">Rooms</a> {'>'} Edit Room</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 position-relative">
                                <h2>Edit Room</h2>
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
                                            <div className="form-group col" style={{ marginTop: '15px' }}>
                                                <label>Availability : </label>
                                                <select id="type" className="form-control" name="type" onChange={this.handleAvailabilityChange} value={this.state.availability} style={{ marginTop: '10px' }} required>
                                                    <option value="Available">Available</option>
                                                    <option value="Not Available">Not Available</option>
                                                </select>
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
                                    {/* add image */}
                                    <div className="col-6 accRoomImage">

                                        {this.state.image ? (
                                            <img
                                                src={this.state.image}
                                                alt="Room image"
                                            />
                                        ) : (
                                            <img
                                                src={this.state.NoItemImg}
                                                alt="Room image"
                                            />
                                        )}
                                        <div className="row">
                                            <div className="form-group" style={{ width: "500px", marginTop: "40px", marginLeft: "10px" }}>
                                                <Progress percentage={this.state.uploadPercentage} />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '50px', maxWidth: '525px' }}>
                                            <div class="input-group mb-3">
                                                <input type="file" class="form-control" id="inputGroupFile02" name="Image" style={{ borderRadius: '20px' }}
                                                    onChange={(e) => { this.setState({ file: e.target.files[0] }); this.uploadImage(e); }} />
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
