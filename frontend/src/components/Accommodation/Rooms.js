import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import swl from 'sweetalert'
import './AccStyles.css';


export default class Rooms extends Component {

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
            <div className="container containerTop">
                <div className="row">
                    <div className="col-1"/>
                    <div className="col-11">
                        <div className="row">
                            <div className="col position-relative link">
                                <p><a href="/Accommodation_Home/">Accommodation Management</a> {'>'} Rooms</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 position-relative">
                                <h2>Accommodation &nbsp;-&nbsp;Rooms</h2>                              
                                <ToastContainer/>                                
                            </div>
                            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                        </div>
                        <div className="row">
                            <div className="col-2 buttons">
                                <a href="/Accommodation_Home/Rooms/add" type="button" class="button" ><span><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Rooms</span></a><br /><br />
                            </div>
                            <div className="col-4 buttons">
                                <a href="#" type="button" class="button" ><span><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</span></a><br /><br />
                            </div>
                            <div className="col-2">                                                                
                            </div>
                            <div className="col-4 search position-relative">
                                <ReactTooltip />
                                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an accommodation" name="searchQuery" data-tip="Enter accommodation name OR room no OR availability" data-type="dark" onChange={this.handleSearchArea} />
                            </div>
                        </div>
                        <div className="shadowBox">
                            <div className="row">
                                <div className="col-12 ">
                                    <table class="table table-hover">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Accommodation Name</th>
                                                <th scope="col">Room No</th>
                                                <th scope="col">No of Beds</th>
                                                <th scope="col">Air Condition</th>
                                                <th scope="col">price</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Availability</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {this.state.rooms.map((rooms, index) => (
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href={`/accommodation/${rooms._id}`} style={{ textDecoration: 'none' }}>{index + 1}</a></th>
                                                    <td>{rooms.accName}</td>
                                                    <td>{rooms.roomNo}</td>
                                                    <td>{rooms.noOfBeds}</td>
                                                    <td>{rooms.airCondition}</td>
                                                    <td>{rooms.price}</td>
                                                    <td>{rooms.description}</td>
                                                    <td>{rooms.availability}</td>
                                                    <td>
                                                        <a href={`/Accommodation_Home/Rooms/edit/${rooms._id}`} type="button" class="btn btn-success" style={{width:'95px', margin:'2px'}}>
                                                            <i class="far fa-edit"></i>&nbsp;Edit
                                                        </a>&nbsp;&nbsp;
                                                        <a href="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(rooms._id)}>
                                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
