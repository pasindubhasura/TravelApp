import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './styles.css'
import {toast} from 'react-toastify';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import Logo from "../../images/Logo.png";
import ReactTooltip from 'react-tooltip';
import swl from 'sweetalert'




export default class GuideHome extends Component {
constructor(props){
    super(props);

    this.state={
        guide:[]
    };
}

//export PDF.

 


componentDidMount(){
    this.retrieveGuide();
}

retrieveGuide(){
    axios.get(`http://localhost:5001/guides`).then(res=>{
    if(res.data.success){
        this.setState({
            guide:res.data.existingGuide
        });
        console.log(this.state.guide);

    }
       
    });
}


onDelete = (id) => {
  swl({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: ["Cancel","Delete"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
        axios.delete(`http://localhost:5001/guide/delete/${id}`).then((res) => {

            swl('Guide successfully Deleted',{
              icon: "success",
            });
            this.retrieveGuide();
        })                
    }
  });
}

filterData(guide,searchKey){
  const result=guide.filter((guide)=>
  guide.registrationNo.toLowerCase().includes(searchKey)||
  guide.name.toLowerCase().includes(searchKey)||
  guide.address.toLowerCase().includes(searchKey)||
  guide.language.toLowerCase().includes(searchKey)||
  guide.availability.toLowerCase().includes(searchKey)

  )
  this.setState({guide:result})
}



handleSearchArea=(e)=>{
  // console.log(e.currentTarget.value);
  const searchKey=e.currentTarget.value;
  axios.get(`http://localhost:5001/guides`).then(res=>{
    if(res.data.success){
      this.filterData(res.data.existingGuide,searchKey)
    }
  });
}


exportPDF = () => {
 

  const data = this.state.guide.map(dlt=> [dlt.registrationNo,dlt.name  ,dlt.address,dlt.email,dlt.phoneNo,dlt.language,dlt.availability])
 

  const doc = new jsPDF({ orientation: "landscape" });
  var time = new Date().toLocaleString();
  doc.setFontSize(27);
  doc.text(`Guide Details Report`, 150, 35, null, null, "center");
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
      ["RNo", "Name", "Address	", "Email", "PhoneNo", "Languages" ,"Availability"],
    ],
    body: data,
  });
  
  doc.save("Guides.pdf");
 }

  render() {
    return (
      <div className="container containerTop" >
        <div className="row">
         <div className="col-1"/>
             <div className="col-11">
                  
                  <div className="row">
                      <div className="col position-relative link">
                          <p><a href="/">Home</a> {'>'} Guides</p>
                      </div>
                  </div>

                
                  <div className="row">
                  <div className="col-9 position-relative">
                          <h2>Guides</h2>
                                                     
                  </div>
                      <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                  </div>

                  <div className="row">
                    <div className="col-2 buttons">
                        <a href="/guide_add" type="button" class="button_add" ><span><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Guide</span></a><br /><br />
                    </div>
                    <div className="col-3 buttons">
                        <a href="#" type="button" class="button_pdf" onClick={()=>this.exportPDF()} ><span><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</span></a><br /><br />
                    </div>
                    <div className="col-2">                                                            
                    </div>
                    <div className="col-4 search position-relative ">
                        <ReactTooltip />
                        <i className="fa fa-search search_home"></i> <input className="form-control search_home" type="Search" placeholder="Search Guides" name="searchQuery" data-tip="Enter Guide Name ,Address or Language" data-type="dark" onChange={this.handleSearchArea} />
                    </div>
                    </div>

                  <div className="tiew">
                    <div className="shadowBox t_sbox">
                    <table class="table table-hover " >
                          <thead class="thead-dark">
                              <tr>
                              <th scope="col">#</th>
                              <th scope="col">Registion No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Address</th>
                              <th scope="col">Email</th>
                              <th scope="col">PhoneNo</th>
                              <th scope="col">Languages</th>
                              <th scope="col">Availability</th>
                              <th scope="col">Action</th>
                              
                              
                              </tr>
                          </thead>
                          <tbody>
                            {this.state.guide.map((guide,index)=> (
                                <tr key={index}>
                                    <th scope="row">G{index + 1}</th>
                                    <td>
                                      <a href={`/guide/${guide._id}`} style={{textDecoration:'none'}}>
                                        {guide.registrationNo}
                                      </a>
                                      </td>
                                      
                                    <td>{guide.name}</td>
                                    <td>{guide.address}</td>
                                    <td>{guide.email}</td>
                                    <td>{guide.phoneNo}</td>
                                    <td>{guide.language}</td>
                                    <td>{guide.availability}</td>
                                  
                                    
                                    <td>
                                        
                                      <Link className="btn btn-outline-warning" to={`/guide_update/${guide._id}`}>
                                        <i className="fas fa-edit"></i> &nbsp;Update
                                      
                                      </Link>
                                      &nbsp;
                                      <Link className="btn btn-danger" onClick={()=>this.onDelete(guide._id)}><i className="far fa-trash-alt"></i>&nbsp;Delete</Link>
                                          
                                      </td>
                                </tr>
                              ))}

                          </tbody>
                          </table>
                  
                  
                          </div>
                          </div>
                            {/* </div>
                        </div>
                             */}
              </div>
            </div>
        </div>
    )
  }
}
