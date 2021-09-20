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


export default class Accommodation extends Component {

    constructor(props) {
        super(props);
        this.state={
            accommodations:[],
            name:""
        };
    }


    //calling the accommodation api
    componentDidMount(){
        this.retrieveAccommodations();
    }
    
    //display accommdation
    retrieveAccommodations(){
        axios.get('http://localhost:5001/accommodation/').then(res => {
            if(res.data.success){
                this.setState({
                    accommodations:res.data.existingAccommodations
                });
                console.log(this.state.accommodations)
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
                axios.delete(`http://localhost:5001/accommodation/delete/${id}`).then((res) => {

                    swl('Accommdation successfully Deleted',{
                      icon: "success",
                    });
                    this.retrieveAccommodations();
                })                
            }
          });
    }

    //search  accommdation function
    filterData(accommodations,searchKey){
        const result=accommodations.filter((accommodation)=>
            accommodation.accommodationType.toLowerCase().includes(searchKey)||
            accommodation.name.toLowerCase().includes(searchKey) ||
            accommodation.location.toLowerCase().includes(searchKey)
        )
        this.setState({accommodations:result});
    }

    handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value.toLowerCase();
        axios.get('http://localhost:5001/accommodation/').then(res => {
            if(res.data.success){
                this.filterData(res.data.existingAccommodations,searchKey)
            }
        });
    }

    //export PDF.
    exportPDF = () => {
 

        const data = this.state.accommodations.map(dlt=> [dlt.accommodationId, dlt.accommodationType, dlt.name, dlt.location, dlt.noOfRomm, dlt.mobile])       
      
        const doc = new jsPDF({ orientation: "landscape" });
        var time = new Date().toLocaleString();
        doc.setFontSize(27);
        doc.text(`Travel Rooms Details Report`, 150, 35, null, null, "center");
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
            ["Acc_ID", "Accommodation Type", "Accommodation Name", "Location", "No of Room", "Mobile Number"],
          ],
          body: data,
        });
        
        doc.save("Rooms_Report.pdf");
       }    


    render() {
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col position-relative link">
                            <p><Link to="/">Home</Link> {'>'} <Link to="/Accommodation_Home/">Accommodation Management</Link> {'>'} Accommodations</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 position-relative">
                                <h2>Accommodations</h2>
                                <ToastContainer/>                                
                            </div>
                            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                        </div>
                        <div className="row">
                            <div className="col-3 buttons">
                                <Link to="/Accommodation_Home/Accommodation/add" type="button" class="button" ><span><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Accommodation</span></Link><br /><br />
                            </div>
                            <div className="col-3 buttons">
                                <Link to="#" type="button" class="button2" onClick={()=>this.exportPDF()} ><span><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</span></Link><br /><br />
                            </div>
                            <div className="col-3">                                                            
                            </div>
                            <div className="col-3 search position-relative">
                                <ReactTooltip />
                                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an accommodation" name="searchQuery" data-tip="Enter accommodation type or name" data-type="dark" onChange={this.handleSearchArea} />
                            </div>
                        </div>
                        <div className="shadowBox">
                            <div className="row">
                                <div className="col-12 ">
                                    <table class="table table-hover">
                                        <thead className="table-green">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Acc_ID</th>
                                                <th scope="col">Accommodation Type</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">No of Room</th>
                                                <th scope="col">Phone number</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {this.state.accommodations.map((accommodations, index) => (
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href={`/accommodation/${accommodations._id}`} style={{ textDecoration: 'none', color:'#000' }}>{index + 1}</a></th>
                                                    <td>{accommodations.accommodationId}</td>
                                                    <td>{accommodations.accommodationType}</td>
                                                    <td>{accommodations.name}</td>
                                                    <td>{accommodations.location}</td>
                                                    <td>{accommodations.noOfRomm}</td>
                                                    <td>{accommodations.mobile}</td>
                                                    <td>
                                                        <Link to={`/Accommodation_Home/Accommodation/edit/${accommodations._id}`} type="button" class="btn btn-warning" style={{width:'95px', margin:'2px'}}>
                                                            <i class="far fa-edit"></i>&nbsp;Edit
                                                        </Link>&nbsp;&nbsp;
                                                        <Link to="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(accommodations._id)}>
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
