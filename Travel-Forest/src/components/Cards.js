import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import './Gallery.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations in Sri Lanka!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
         
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Destinations'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Guides'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Vehicles'
              path='/sign-up'
            />
             <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Acommodation'
              path='/sign-up'
            />
             
            
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-s1.jpg'
              text='Located west to Unawatuna, Jungle Beach is a pretty bay nestled in a forested area.'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
        </div>
      </div>

      {/* Gallery Code */}

      <div className="Gallery">
        <div className="row">
          <div className="headTop">
            <div className="row">
              <div className="col" style={{ textAlign: 'center'}}>
                <h1>Travel Gallery</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">          
          <div className="col-12">
            <div className="col shadow">
              <div className="box" style={{ maxWidth: '100%' }}>
                <div className="dream">
                  <img src="/images/acc-gallery-8.jpg" />
                  <img src="/images/acc-gallery-1.jpg" />
                  <img src="/images/acc-gallery-9.jpg" />
                </div>
                <div className="dream">
                  <img src="/images/acc-gallery-3.jpg" />
                  <img src="/images/acc-gallery-0.jpg" />
                </div>
                <div className="dream">
                  <img src="/images/acc-gallery-2.jpg" />
                  <img src="/images/acc-gallery-12.jpg" />
                  <img src="/images/acc-gallery-11.jpg" />
                </div>
                <div className="dream">
                  <img src="/images/acc-gallery-14.jpg" />
                  <img src="/images/acc-gallery-5.jpg" />
                  <img src="/images/acc-gallery-7.jpg" />
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>      
    </div>
  );
}

export default Cards;
