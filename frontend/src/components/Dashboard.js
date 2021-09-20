import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'
import './Dashboard.css';
import "./calendar.css";
import axios from "axios";

const Home = () => {
    const [destinationC, setdestinationC] = useState(0);
    const [accommodationC, setaccommodationC] = useState(0);
    const [vehiclesC, setvehiclesC] = useState(0);
    const [guidesC, setguidesC] = useState(0);

    useEffect(() => {
        getCount();
    },[])

    const getCount = async() => {
    const res = await axios.get("http://localhost:5001/destinations/getCount");
    setdestinationC(res.data.destinationC);
    setaccommodationC(res.data.accommodationC);
    setvehiclesC(res.data.vehiclesC);
    setguidesC(res.data.guidesC);
    }
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
                                            <h1 style={{color:'#fff'}}><i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp;{destinationC}</h1>
                                        </div>
                                    </div>
                                </Link>                                
                            </div>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px', marginLeft:'20px'}}>
                                <Link to="/get_guide" style={{textDecoration: 'none'}}>
                                    <div class="img2 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Guides</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="far fa-user"></i>&nbsp;&nbsp;{guidesC}</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-2 col-xs-2" />
                        </div>
                        <div className="row bottom" style={{marginTop:'40px'}}>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px'}}>
                                <Link to="/travelVehicle" style={{textDecoration: 'none'}}>
                                    <div class="img3 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Vehicles</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="fas fa-car"></i>&nbsp;&nbsp;{vehiclesC}</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-5 col-xs-5 d-flex justify-content-center" style={{marginTop:'10px',marginLeft:'20px'}}>
                                <Link to="/Accommodation_Home" style={{textDecoration: 'none'}}>
                                    <div class="img4 imgSize" style={{width: '20rem'}} >
                                        <div className="title">
                                            <h4>Accommodation</h4>
                                        </div>
                                        <div className="body">
                                            <h1 style={{color:'#fff'}}><i class="fas fa-hotel"></i>&nbsp;&nbsp;{accommodationC}</h1>
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
export default Home;