import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/v3.mp4' autoPlay loop muted /> */}
      <img className="img1" src='/images/img-2.jpg' autoPlay loop/>
      <img className="logo-image" style={{ maxWidth: '520px', marginBottom:'100px' }} src="../images/logo2.png" />
      <h1>Travel Forest</h1>
      <p>Welcome to Sri Lanka</p>
      
   
    </div>
  );
}

export default HeroSection;
