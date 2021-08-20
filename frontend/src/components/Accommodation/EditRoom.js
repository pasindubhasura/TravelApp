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
        axios.get(`http://localhost:5001/room/`).then(res => {
            if(res.data.success){
                this.setState({
                    rooms:res.data.existingRooms
                });
                console.log(this.state.rooms);
            }
        });
    }    

    //delete function with confirmation
    onDelete=(id)=>{
        swl({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: ["Cancel","Delete"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5001/room/delete/${id}`).then((res) => {

                    swl('Room successfully Deleted',{
                      icon: "success",
                    });
                    this.retrieveRooms();
                })                
            }
          });
    }
    
    //define search options
    filterData(rooms,searchKey){
        const result=rooms.filter((room)=>            
            room.accName.toLowerCase().includes(searchKey)||
            room.airCondition.toLowerCase().includes(searchKey)||
            room.availability.toLowerCase().includes(searchKey)            
        )
        this.setState({rooms:result});
    }

    //search room function
    handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value.toLowerCase();
        axios.get('http://localhost:5001/room/').then(res => {
            if(res.data.success){
                this.filterData(res.data.existingRooms,searchKey);
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
