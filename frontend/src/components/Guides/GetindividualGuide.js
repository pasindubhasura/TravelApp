
import React, {Component} from 'react';
import axios from 'axios';



export default class GetindividualGuide extends Component{
    constructor(props){
        super(props);
        this.state={
            guide:{}
        };
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5001/guide/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    guide:res.data.guide
                });
                console.log(this.state.guide);
            }
        })
    }
    render(){
        const {registrationNo,name,address,email,phoneNo,language,availability}=this.state.guide;
        return(
            <div className="shadowBox">
            <div className ="tname"> 
            <h4  style={{textAlign:'center'}}>{name}'s Deatils</h4>
            </div>
          
            <hr/>
            <dl className="row ">
                
                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{registrationNo}</dd>

                <dt className="col-sm-3">Address </dt>
                <dd className="col-sm-9">{address}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{email}</dd>

                <dt className="col-sm-3">phoneNo</dt>
                <dd className="col-sm-9">{phoneNo}</dd>

                <dt className="col-sm-3">language</dt>
                <dd className="col-sm-9">{language}</dd>


                
            </dl>
          
            </div>
        )
    }
}