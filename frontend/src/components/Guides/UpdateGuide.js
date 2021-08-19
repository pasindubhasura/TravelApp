import React, { Component } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class UpdateGuide extends Component {

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

        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {

        e.preventDefault();
        const id = this.props.match.params.id;
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
        axios.put(`http://localhost:5001/guide/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Employee Updated`, {
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
    };

    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5001/guide/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    registrationNo: res.data.guide.registrationNo,
                    name: res.data.guide.name,
                    address: res.data.guide.address,
                    email: res.data.guide.email,
                    phoneNo: res.data.guide.phoneNo,
                    language: res.data.guide.language,
                    availability: res.data.guide.availability,
                });
                console.log(this.state.guide);
            }
        })
    }
    render() {
        const {formErrors}= this.state;

        return (
            <div className="container">
                <div className="row ">
                   

                    <div className="col-6 shadowBox" >
                        
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal head-line">Upadete Guide</h1>
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

                                {/* {formErrors.name.length > 5  &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.name}</span>
                            )} */}

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
                                    className={"form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                                     {/* {formErrors.email.length > 0 && (
                                    <span style={{ color: 'red',fontWeight:'bold' }} className="errorMessage">{formErrors.email}</span>
                                )} */}
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

                                {/* {formErrors.phoneNo.length > 10 &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.phoneNo}</span>
                                 )} */}

                            </div>
                        
                       {/* Language */}
                       <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Language</label>
                                <select id="language" className="form-control" name="language" onChange={this.handleInputChange} value={this.state.language} required>  
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
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Availability</label>
                                <select id="availability" className="form-control" name="availability" onChange={this.handleInputChange} value={this.state.availability} required>  
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
                                <button href="/guide_add" type="submit"  className="btn btn-outline-success sub_btn2"><i class="far fa-times-circle"></i>&nbsp;Reset</button>
                                <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Add</button>
                            
                                </div>
                                
                           
                        </form>
                    </div>
                    <div className="col-6">
                        {/* <img className="add_img" src="../images/E3.png" /> */}
                    </div>
                </div>
            </div>

        );
    };
}