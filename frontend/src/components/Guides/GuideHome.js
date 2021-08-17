import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './styles.css'
// import {jsPDF} from 'jspdf'
// import 'jspdf-autotable'
// import './estyle.css';


export default class GuideHome extends Component {
constructor(props){
    super(props);

    this.state={
        guide:[]
    };
}

//export PDF.

// exportPDF = () => {
//   const unit = "pt";
//   const size = "A3"; // Use A1, A2, A3 or A4
//   const orientation = "portrait"; // portrait or landscape

//   const marginLeft = 40;
//   const doc = new jsPDF(orientation, unit, size);

//   doc.setFontSize(15);

//   const title = "Guide Details";
//   const headers = [['Name','Email','Address', 'MobileNo', 'Designation','date' ,'Salary(LKR)']];

//   const data = this.state.guide.map(elt=> [elt.name, elt.email,elt.address,elt.mobileNo,elt.designation,elt.date,elt.salary ]);

//   let content = {
//     startY: 50,
//     head: headers,
//     body: data
//   };

//   doc.text(title, marginLeft, 40);
//   doc.autoTable(content);
//   doc.save("Employee.pdf")
// }


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
  axios.delete(`http://localhost:5001/guide/delete/${id}`).then((res) => {
    alert("Deleted Successfully");
    this.retrieveGuide();
  })
}

filterData(guide,searchKey){
  const result=guide.filter((guide)=>
  guide.name.toLowerCase().includes(searchKey)||
  guide.email.toLowerCase().includes(searchKey)||
  guide.address.toLowerCase().includes(searchKey)||
  guide.designation.toLowerCase().includes(searchKey)

  )
  this.setState({guide:result})
}



handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value;
  axios.get("http://localhost:5001/guides").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingEmployee,searchKey)
    }
  });
}

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">

            </div>
            <div className="col-lg-3 mt-2 mb-2 ">
              <input
              className="form-control"
              type="search"
              placeholder="🔍 Search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>

        </div> 
            <div className="py-4">
            <h1>Guides</h1>
            <table class=" table table-striped borde" >
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
                               
                            <Link  className="btn btn-outline-primary" to={`/guide_update/${guide._id}`}>
                              <i className="fas fa-edit"></i> &nbsp;Update
                            
                            </Link>
                            &nbsp;
                            <Link className="btn btn-danger" onClick={()=>this.onDelete(guide._id)}><i className="far fa-trash-alt"></i>&nbsp;Delete</Link>
                                
                            </td>
                      </tr>
                    ))}

                </tbody>
                </table>
                <Link to="/guide_add" className="btn btn-warning"><i className="fas fa-user-plus"></i>&nbsp;Add Guide</Link>&nbsp;
                {/* <Link onClick={()=>this.exportPDF()} to="#" className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link> */}
                
                
 
            </div>
        </div>
    )
  }
}
