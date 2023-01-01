import './Ad.css';
import React from 'react';
import { Link } from 'react-router-dom';
import desktopAd from "../../resources/ads/freelanceHPTO728x90.png"
import mobileAd from "../../resources/ads/freelanceHPTO300x250.png"

const Ad = () => {
  
  return (
    //CSS media queries will display 728x90 ad on desktop and tablet and a 300x250 ad in mobile views
      <div className="itemAContainerAd">
          <Link to="/ads" className="itemAAd"><img alt="ad" className="itemAAd" src={desktopAd}></img></Link>
          <Link to="/ads" className="itemBAd"><img alt="ad" className="itemBAd" src={mobileAd}></img></Link>
      </div>
      
  );
}

export default Ad;