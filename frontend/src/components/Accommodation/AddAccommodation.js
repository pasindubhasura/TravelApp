import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
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

export default class AddAccommodation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            accommodationId:"",
            accommodationType:"",
            name:"",
            location:"",
            noOfRomm:Number,
            mobile:Number,
            //Firebase Image Upload States
            file: null,
            uploadPercentage: 0,
            NoItemImg: defaultImage,
            accImage: "",            
            formErrors: {
                accommodationId: "",
                location:"",
                name: "",
                noOfRomm: 0,
                mobile: 0
            }
        };
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
                            this.setState({ accImage: url });
                        });
                }
            );
        } else {
            toast.error("Error in Uploading an Image 🛑");
        }
    }

    
    //handle input feild

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "accommodationId":
                formErrors.accommodationId =
                    value.trim().length < 5
                        ? "Id must have minimum 5 charactors"
                        : "";
                break;
                case "name":
                    formErrors.name =
                        value.trim().length < 5
                            ? "this field is required minimum 5 charachter"
                            : "";
                    break;
                    case "noOfRomm":
                        formErrors.noOfRomm =
                            value < 0
                                ? "Invalid Number !"
                                : "";
                        break;
                        case "location":
                            formErrors.location =
                                value.trim().length < 2
                                ? "this field is required minimum 2 charactor"
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

            const { accommodationId, accommodationType, location, name, noOfRomm, mobile, accImage } = this.state;
            const data = {
                accommodationId:accommodationId,
                accommodationType:accommodationType,
                name:name,
                location: location,
                noOfRomm:noOfRomm,
                mobile:mobile,
                accImage:accImage
            }
        //console.log(data)
        axios.post("http://localhost:5001/accommodation/add",data).then((res) => {
            if (res.data.success) {
                toast.success("Accommodation "+ this.state.name +" Added");
                this.setState(
                    {
                        accommodationId: "",
                        accommodationType: "",
                        name: "",
                        location: "",
                        noOfRomm: Number,
                        mobile: Number
                    }
                )
            } else {
                toast.error("You have an Error in Updating 🛑");
            }
        });
    }
    else
        toast.error("Please Enter Details Correclty ❗");
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
                            <p><Link to="/">Home</Link> {'>'} <Link to="/Accommodation_Home/">Accommodation Management</Link> {'>'} <Link to="/Accommodation_Home/Accommodation/">Accommodation</Link> {'>'} Add Accommodation</p>
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
                                                <label>Accommodation ID : </label>
                                                <input type="text" className="form-control" minLength="5" name="accommodationId" placeholder="ACCXXXX" value={this.state.accommodationId} onChange={this.handleInputChange}  required />
                                                {formErrors.accommodationId.length > 5 &&(
                                                    <p style={{color:'red'}} className="errorMessage">{formErrors.accommodationId}</p>
                                                )}                                                
                                            </div>                                             
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
                                                <label>Location : </label>
                                                <input type="text" className="form-control" name="location" placeholder="#Yaala" value={this.state.location} onChange={this.handleInputChange}  required />
                                                {formErrors.location.length > 2 &&(
                                                    <p style={{color:'red'}} className="errorMessage">{formErrors.location}</p>
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
                                                    <Link to="/Accommodation_Home/Accommodation/" className="btn btn-danger acc-button"><i className="fas fa-times"></i>&nbsp;Cancel</Link>
                                                </div>
                                            </div>
                                            <div className="col-6" />
                                        </div>
                                    </form>
                                </div>
                                    {/* add image */}
                                    <div className="col-6 accAccImage">

                                        {this.state.accImage ? (
                                            <img
                                                src={this.state.accImage}
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
                                        <div className="row" style={{ marginTop: '50px', marginBottom:'50px', maxWidth: '525px' }}>
                                            <div class="input-group mb-3">
                                                <input type="file" class="form-control" id="inputGroupFile02" name="Image" style={{ borderRadius: '20px' }}
                                                    onChange={(e) => { this.setState({ file: e.target.files[0] }); this.uploadImage(e); }} />
                                            </div>
                                        </div>
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
