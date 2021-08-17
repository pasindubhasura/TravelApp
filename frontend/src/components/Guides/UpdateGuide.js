import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationNo: "",
            name: "",
            address: "",
            email: "",
            phoneNo: Number,
            language: "",
            availability:"",
            

            formErrors:{
                phoneNo:Number,
                name:"",
                email:""
                
            } 

        }
    }

    handleInputChange = (e) => {
        // validaons
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case "name":
            formErrors.name=
            value.length < 5
            ?"Minimum charchter must be 5"
            :"";
            break;
            case "email":
            formErrors.email = invoiceRegx.test(value)
            ? ""
            : "Didn't match pattern";
            break;
            case "phoneNo":
            formErrors.phoneNo =
            value.length > 10 || value.length > 10
            ? "Must be 10 digits"
            :"";
            break;
            default:
            break;
        }
        this.setState({formErrors,[name]: value},()=> console.log(this.state));

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(formValid(this.state.formErrors)){
           

        const {registrationNo,name, address,email, phoneNo, language, availability } = this.state;

        const data = {
            registrationNo:registrationNo,
            name: name,
            address: address,
            email: email,
            phoneNo: phoneNo,
            language: language,
            availability: availability,
           
        }
        console.log(data)
        axios.post("http://localhost:5001/guide/add", data).then((res) => {
            if (res.data.success) {
                toast(`New Guide Added`, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        registrationNo: "",
                        name: "",
                        address: "",
                        email: "",
                        phoneNo: Number,
                        language: "",
                        availability:"",
                        
                    }
                )
            };
        });
    }
    else{
        toast(`Your Inserting blank! `, {
            type: toast.TYPE.ERROR,
            autoClose: 4000
        });
    
    }
    };

    render() {
        const {formErrors}= this.state;

        return (
            <div className="container">
                <div className="row ">
                   

                    <div className="col-6 shadowBox" >
                        
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal">Add New Guide</h1>
                        </center>

                    <form className="needs-validation " noValidate >
                     
                     {/* Registration No */}    
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Registration No:</label>
                                <input type="text"
                                    className="form-control"
                                    name="registrationNo"
                                    placeholder="Enter Registration No"
                                    value={this.state.registrationNo}
                                    onChange={this.handleInputChange} />

                                {/* {formErrors.registrationNo.length > 5  &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.registrationNo}</span>
                            )} */}

                            </div>

                        {/* Guide Name */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Guide Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Guide Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />

                                {formErrors.name.length > 5  &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.name}</span>
                            )}

                            </div>
                            
                        {/* Address */}

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} />
                            </div>
                        
                         {/* Email */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="email"
                                    className={formErrors.email.length > 0 ? "error" : "form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                                     {formErrors.email.length > 0 && (
                                    <span style={{ color: 'red',fontWeight:'bold' }} className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>

                         {/* Phone */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Phone No</label>
                                <input type="number"
                                    className="form-control"
                                    name="phoneNo"
                                    placeholder="Enter PhoneNo"
                                    value={this.state.phoneNo}
                                    onChange={this.handleInputChange} />

                                {formErrors.phoneNo.length > 10 &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.phoneNo}</span>
                                 )}

                            </div>
                        
                        {/* Language */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Language</label>
                                <input type="text"
                                    className="form-control"
                                    name="language"
                                    placeholder="Enter Language"
                                    value={this.state.language}
                                    onChange={this.handleInputChange} />
                            </div>
                        
                
                        
                        {/* availability */}
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Availability</label>
                                <input type="text"
                                    className="form-control"
                                    name="availability"
                                    placeholder="Enter Availability"
                                    value={this.state.availability}
                                    onChange={this.handleInputChange} />
                            </div>

                    
                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Add</button>
                                    
                                </div>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button href="/guide_add" type="submit" className="btn btn-primary sub_btn " ><i class="far fa-times-circle"></i>&nbsp;Reset</button>
                                </div>
                            </center>
                        </form>
                    </div>
                    <div className="col-6">
                        {/* <img className="add_img" src="../images/E3.png" /> */}
                    </div>
                </div>
            </div>

        );
    };
};