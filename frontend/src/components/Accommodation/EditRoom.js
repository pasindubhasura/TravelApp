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
            const { accName, roomNo, noOfBeds, airCondition, price, description, availability } = this.state;
            const data = {
                accName: accName,
                roomNo: roomNo,
                noOfBeds: noOfBeds,
                airCondition: airCondition,
                price: price,
                description: description,
                availability: availability
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
                    availability: res.data.room.availability
                });
                console.log(this.state.room);
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
