import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import swl from 'sweetalert'
import './AccStyles.css';

export default class EditRoom extends Component {

    constructor(props){
        super(props);
        this.state={
            rooms:[],
            roomNo: Number
        };
    }

    //calling the room api
    componentDidMount(){
        this.retrieveRooms();
    }

    retrieveRooms(){
        axios.get(`http://localhost:8070/room/`).then(res => {
            if(res.data.success){
                this.setState({
                    rooms:res.data.existingRooms
                });
                console.log(this.state.rooms);
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
