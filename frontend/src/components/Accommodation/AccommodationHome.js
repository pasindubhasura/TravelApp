import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './AccStyles.css';

export default class AccommodationHome extends Component {

    render() {
        return (
            <div className="container containerTop">
                <div className="row">
                    <div className="col-1"/>
                    <div className="col-10">
                        <div className="row caption">
                            <div className="col-9 position-relative">
                                <h2>Accommodation Management</h2>
                            </div>
                            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                        </div>      
                        <div className="row card-section">
                            <div className="col-6 d-flex justify-content-center">
                                <div className="card" style={{width: '25rem'}}>
                                    <img className="card-img-top" src="/images/acc-img2.jpg" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Manage Accommodations</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div className="view d-flex justify-content-center">
                                            <Link className="btn button btn-primary text-center" to="/Accommodation_Home/Accommodation/">View &raquo;</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div className="card" style={{width: '25rem'}}>
                                    <img className="card-img-top" src="/images/acc-img4.jpg" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Manage Rooms</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div className="view d-flex justify-content-center">
                                            <Link className="btn button btn-primary text-center" to="/Accommodation_Home/Rooms/">View &raquo;</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="col-1"/>
                </div>
            </div>
        )
    }
}
