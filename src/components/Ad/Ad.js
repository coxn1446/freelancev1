import './Ad.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ad from "../../resources/ads/freelanceHPTO728x90.png"

const Ad = () => {
  
  return (
      <div className="itemAContainerAd">
          <Link to="/ads" className="itemAAd"><img className="itemAAd" src={ad}></img></Link>
      </div>
  );
}

export default Ad;