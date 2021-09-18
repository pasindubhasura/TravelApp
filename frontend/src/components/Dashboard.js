import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'
import './Dashboard.css';
import "./calendar.css";


export default class Home extends Component {

    render() {
        return (
            <div className="container">
                <div className="row dashboardCards" style={{marginTop:'45px'}}>
                    <div className="col-md-8 col-xs-8">
                        <div className="row">
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px'}}>
                                <Link to="/destinations" style={{textDecoration: 'none'}}>
                                    <div class="img1 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Destination</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp;7</h1>
                                        </div>
                                    </div>
                                </Link>                                
                            </div>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px'}}>
                                <Link to="/get_guide" style={{textDecoration: 'none'}}>
                                    <div class="img2 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Guides</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="far fa-user"></i>&nbsp;&nbsp;2</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-2 col-xs-2" />
                        </div>
                        <div className="row" style={{marginTop:'40px'}}>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px'}}>
                                <Link to="/travelVehicle" style={{textDecoration: 'none'}}>
                                    <div class="img3 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Vehicles</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="fas fa-car"></i>&nbsp;&nbsp;6</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px'}}>
                                <Link to="/Accommodation_Home" style={{textDecoration: 'none'}}>
                                    <div class="img4 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Accommodation</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="fas fa-hotel"></i>&nbsp;&nbsp;9</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-2 col-xs-2" />
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <Calendar className="calender"/>
                    </div>                                  
                </div>
            </div>
        )
    }
}
