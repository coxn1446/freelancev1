import React, {useState} from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from "react-router-dom";
import linkedInSignInButton from "../../resources/linkedinsigninbutton.png"
import facebookSignInButton from "../../resources/facebooksigninbutton.png"
import twitterSignInButton from "../../resources/twittersigninbutton.png"
import "./home.css"


const Home = () => {
  const [twitterProfilePicURL, setTwitterProfilePicURL] = useState('');
  const [twitterScreenName, setTwitterScreenName] = useState('');
  const [twitterName, setTwitterName] = useState('');
  const [linkedInName, setLinkedInName] = useState('');
  const [linkedInPicture, setLinkedInPicture] = useState('');

  const [userData] = useOutletContext();
  let formAction = 'http://localhost:4000/auth/test'
  const linkedinSignIn = () => {
    window.location.assign(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECTURL}&state=${process.env.REACT_APP_LINKEDIN_STATE}&scope=r_liteprofile%20r_emailaddress%20w_member_social`)
  }

  if(userData.passport.twitter) {
    fetch(`http://localhost:4000/twitter/user/${userData.passport.twitter[3]}`,{
      method: 'GET',
      credentials: "include"
  }).then(response => response.json())
  .then(result => {
    setTwitterProfilePicURL(result.profile_image_url);
    setTwitterScreenName(result.screen_name)
    setTwitterName(result.name)
  })
  .catch(error => console.log('error', error));
  }

  if(userData.passport.linkedin) {
    fetch("http://localhost:4000/linkedin/user", {
      method: 'GET',
      credentials: "include"
    }).then(response => response.json())
    .then(result => {
      setLinkedInName(`${result.firstName.localized.en_US} ${result.lastName.localized.en_US}`)
      setLinkedInPicture(result.profilePicture["displayImage~"].elements[0].identifiers[0].identifier)
    
    })
    .catch(error => console.log('error', error));
  }

  return (
    <div className="gridContainerHome">
      <p className="itemAContainerHome">You are logged in as:</p>
      {
        userData.passport.twitter ? 
          <div className="itemBContainerHome">
            <img className="itemBAHome" src={twitterProfilePicURL}></img>
            <p className="itemBBHome">{twitterScreenName}</p>
            <p className="itemBCHome">{twitterName}</p>
          </div> :
          <form action="http://localhost:4000/twitter/oauth1" method="post">
            <button type="submit"><img src={twitterSignInButton} style={{height: '25px'}} ></img></button>
          </form>
      }
      {
        userData.passport.facebook ? 
          <div className="itemCContainerHome">
            <img className="itemBAHome" src={twitterProfilePicURL}></img>
            <p className="itemBBHome">{twitterScreenName}</p>
            <p className="itemBCHome">{twitterName}</p>
          </div> :
          <form action="http://localhost:4000/twitter/oauth1" method="post">
            <button type="submit"><img src={facebookSignInButton} style={{height: '25px'}} ></img></button>
          </form>
      }
      {
        userData.passport.linkedin ? 
          <div className="itemDContainerHome">
            <img className="itemBAHome" src={linkedInPicture}></img>
            <p className="itemBBHome">{linkedInName}</p>
            <p className="itemBCHome">{twitterName}</p>
          </div> :
          <button type="submit"><img src={linkedInSignInButton} style={{height: '25px'}} onClick={linkedinSignIn}></img></button>
      }
      <form className="itemEContainerHome" method='get' action={formAction} >
        <textarea></textarea>
      </form>

      <form className="itemGContainerHome" action="http://localhost:4000/auth/logout" method="post">
				<button type="submit" value='submit'>Logout</button>
			</form>
    </div>
  );
}

export default Home;