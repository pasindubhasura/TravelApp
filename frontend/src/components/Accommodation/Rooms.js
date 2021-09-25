import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import swl from 'sweetalert'
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import Logo from "../../images/Logo.png";
import './AccStyles.css';


export default class Rooms extends Component {

    constructor(props){
        super(props);
        this.state={
            rooms:[], //define room list as array
            roomNo: Number
        };
    }  
    
    
    //calling the room api
    componentDidMount(){
        this.retrieveRooms();
    }
    //retrieve rooms from mongodb parsing the url
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
          })//if user select yes as option this .then will call and delete data from the database
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5001/room/delete/${id}`).then((res) => {

                    swl('Room successfully Deleted',{
                      icon: "success",
                    });
                    //rederect to the rooms page
                    this.retrieveRooms();
                })                
            }
          });
    }


    //define search options
    filterData(rooms,searchKey){
        const result=rooms.filter((room)=>    
            //defining searching keyworlds        
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

    //export PDF.
    exportPDF = () => {
 

        const data = this.state.rooms.map(dlt=> [dlt.accName, dlt.roomNo, dlt.noOfBeds, dlt.airCondition, dlt.price, dlt.description, dlt.availability])       
      
        const doc = new jsPDF({ orientation: "landscape" });
        var time = new Date().toLocaleString();
        doc.setFontSize(27);
        doc.text(`Travel Accommodation Room Details Report`, 150, 35, null, null, "center");
        doc.setFontSize(10);
        doc.text(`(Generated on ${time})`, 150, 41, null, null, "center");
        doc.setFontSize(12);
       
        doc.addImage(Logo, "JPEG", 142, 0, 25, 25); 
        doc.autoTable({
          theme: "grid",
          styles: { halign: "center" },
          headStyles: { fillColor:"#38B000" },
          startY: 44,
          head: [
            ["Acc_name", "RoomNo", "No of Bed", "Air Condition", "Price", "Description" ,"Availability"],
          ],
          body: data,
        });
        
        doc.save("Room_Report.pdf");
       }



    render() {
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col position-relative link">
                            <p><Link to="/">Home</Link> {'>'} <Link to="/Accommodation_Home/">Accommodation Management</Link> {'>'} Rooms</p>
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
                                <Link to="/Accommodation_Home/Rooms/add" type="button" class="button" ><span><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Rooms</span></Link><br /><br />
                            </div>
                            <div className="col-4 buttons">
                                <Link to="#" type="button" class="button2" onClick={()=>this.exportPDF()} ><span><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</span></Link><br /><br />
                            </div>
                            <div className="col-3">                                                                
                            </div>
                            <div className="col-3 search position-relative">
                                <ReactTooltip />
                                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search a room" name="searchQuery" data-tip="Enter accommodation name OR room no OR availability" data-type="dark" onChange={this.handleSearchArea} />
                            </div>
                        </div>
                        <div className="shadowBox">
                            <div className="row">
                                <div className="col-12 ">
                                    <table class="table table-hover">
                                        <thead className="table-green">
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
                                        {/* retrieve Room details using mapping  */}
                                        {this.state.rooms.map((rooms, index) => (
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href={`/accommodation/${rooms._id}`} style={{ textDecoration: 'none', color:'#000' }}>{index + 1}</a></th>
                                                    <td>{rooms.accName}</td>
                                                    <td>{rooms.roomNo}</td>
                                                    <td>{rooms.noOfBeds}</td>
                                                    <td>{rooms.airCondition}</td>
                                                    <td>{rooms.price}</td>
                                                    <td style={{maxWidth:'100px',whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}} >{rooms.description}</td>
                                                    <td>{rooms.availability}</td>
                                                    <td>
                                                        <Link to={`/Accommodation_Home/Rooms/edit/${rooms._id}`} type="button" class="btn btn-warning" style={{width:'95px', margin:'2px'}}>
                                                            <i class="far fa-edit"></i>&nbsp;Edit
                                                        </Link>&nbsp;&nbsp;
                                                        <Link to="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(rooms._id)}>
                                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                                        </Link>
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
