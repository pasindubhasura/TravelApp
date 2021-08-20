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
        axios.get('http://localhost:8070/accommodation/').then(res => {
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
                axios.delete(`http://localhost:8070/accommodation/delete/${id}`).then((res) => {

                    swl('Accommdation successfully Deleted',{
                      icon: "success",
                    });
                    this.retrieveAccommodations();
                })                
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
