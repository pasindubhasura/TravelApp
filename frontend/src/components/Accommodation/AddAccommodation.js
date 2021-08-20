import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AccStyles.css';


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


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
