import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import swl from 'sweetalert'
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
            accommodation.name.toLowerCase().includes(searchKey)
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


    render() {
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-1"/>
                    <div className="col-11">
                        <div className="row">
                            <div className="col position-relative link">
                                <p><a href="/Accommodation_Home/">Accommodation Management</a> {'>'} Accommodations</p>
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
                                <a href="/Accommodation_Home/Accommodation/add" type="button" class="button" ><span><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Accommodation</span></a><br /><br />
                            </div>
                            <div className="col-3 buttons">
                                <a href="#" type="button" class="button" ><span><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</span></a><br /><br />
                            </div>
                            <div className="col-2">                                                                
                            </div>
                            <div className="col-4 search position-relative">
                                <ReactTooltip />
                                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an accommodation" name="searchQuery" data-tip="Enter accommodation type or name" data-type="dark" onChange={this.handleSearchArea} />
                            </div>
                        </div>
                        <div className="shadowBox">
                            <div className="row">
                                <div className="col-12 ">
                                    <table class="table table-hover">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Accommodation Type</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">No of Room</th>
                                                <th scope="col">Phone number</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {this.state.accommodations.map((accommodations, index) => (
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href={`/accommodation/${accommodations._id}`} style={{ textDecoration: 'none' }}>{index + 1}</a></th>
                                                    <td>{accommodations.accommodationType}</td>
                                                    <td>{accommodations.name}</td>
                                                    <td>{accommodations.noOfRomm}</td>
                                                    <td>{accommodations.mobile}</td>
                                                    <td>
                                                        <a href={`/Accommodation_Home/Accommodation/edit/${accommodations._id}`} type="button" class="btn btn-success" style={{width:'95px', margin:'2px'}}>
                                                            <i class="far fa-edit"></i>&nbsp;Edit
                                                        </a>&nbsp;&nbsp;
                                                        <a href="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(accommodations._id)}>
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
