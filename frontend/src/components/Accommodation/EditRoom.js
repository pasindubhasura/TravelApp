import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import swl from 'sweetalert'
import './AccStyles.css';

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
        axios.get('http://localhost:8070/accommodation/').then(res => {
            if (res.data.success) {
                this.setState({
                    accommodations: res.data.existingAccommodations
                });
                console.log(this.state.accommodations)
            }
        });
    }    
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
