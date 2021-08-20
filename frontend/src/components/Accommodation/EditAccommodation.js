import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AccStyles.css';


export default class EditAccommodation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accommodationType: null,
            name: null,
            noOfRomm: Number,
            mobile: Number,
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
            const id = this.props.match.params.id;
            const { accommodationType, name, noOfRomm, mobile } = this.state;
            const data = {
                accommodationType: accommodationType,
                name: name,
                noOfRomm: noOfRomm,
                mobile: mobile
            }
        //console.log(data)
        axios.put(`http://localhost:8070/accommodation/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast.success("Accommodation "+this.state.name+" Update Successfully !");
                this.setState(
                    {
                        accommodationType: "",
                        name: "",
                        noOfRomm: Number,
                        mobile: Number
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
    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
