import React, {useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav"

import linkedInSignInButton from "../../resources/linkedinsigninbutton.png"
import facebookSignInButton from "../../resources/facebooksigninbutton.png"
import twitterSignInButton from "../../resources/twittersigninbutton.png"

import * as homeState from "../../store/home/home.reducer"

import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "../../store/home/home.actions"

import "./home.css"


const Home = () => {
  //Creates useDispatch instance
  const dispatch = useDispatch()

  //Pulls parameters from URL to use in conditional logic below
  const [searchParams, setSearchParams] = useSearchParams();

  //Add the other options
  const tweetsent = searchParams.get("tweetsent")

  //Pulls in Redux state variables
  const twitterURL = useSelector(homeState.selectTwitterURL);
  const twitterTextOne = useSelector(homeState.selectTwitterTextOne);
  const twitterTextTwo = useSelector(homeState.selectTwitterTextTwo);

  const linkedinURL = useSelector(homeState.selectLinkedinURL);
  const linkedinTextOne = useSelector(homeState.selectLinkedinTextOne);
  const linkedinTextTwo = useSelector(homeState.selectLinkedinTextTwo);
  const linkedinID = useSelector(homeState.selectLinkedinID);

  const facebookURL = useSelector(homeState.selectFacebookURL);
  const facebookTextOne = useSelector(homeState.selectFacebookTextOne);
  const facebookTextTwo = useSelector(homeState.selectFacebookTextTwo);

  const formSubmitText = useSelector(homeState.selectFormSubmitText)
  const formAction = useSelector(homeState.selectFormAction)
  const textareaPlaceholderText = useSelector(homeState.selectTextareaPlaceholderText)
  const isFacebookSelected = useSelector(homeState.selectIsFacebookSelected)
  const itemBStyle = useSelector(homeState.selectItemBStyle)
  const itemCStyle = useSelector(homeState.selectItemCStyle)
  const itemDStyle = useSelector(homeState.selectItemDStyle)

  //Allows the use of props passed in from Routes Outlet
  const [userData] = useOutletContext();

  //Redirects user to LinkedIn login page
  const linkedinSignIn = () => {
    dispatch({type: "home/linkedinSignIn"})
  }

  //Redirects user to Facebook login page
  const facebookSignIn = () => {
    dispatch({type: "home/facebookSignIn"})
  }

  //Redirects user to Facebook share dialogue
  const facebookShare = () => {
    window.location.assign(`https://www.facebook.com/dialog/feed?app_id=1552095471881422&display=page&link=google.com&redirect_uri=http://localhost:3000?facebookpostsent=true`)
  }

  //Checks whether user is logged into social media account.
  //If they are, makes a call to the respective social API to pull user info
  //useMemo() ensures this call is only made once instead of at each component level
  useMemo(() => {
    if(userData.passport.twitter){
      dispatch(getTwitterInfo(userData.passport.twitter[3]))
    }
  }, [userData.passport.twitter]);

  useMemo(() => {
    if(userData.passport.linkedin){
      dispatch(getLinkedinInfo())
      dispatch({type: "home/linkedinChooseJob"})
    }
  }, [userData.passport.linkedin]);

  useMemo(() => {
    if(userData.passport.facebook){
      dispatch(getFacebookInfo1(userData.passport.facebook.access_token))
      dispatch(getFacebookInfo2(userData.passport.facebook.access_token))
    }
  }, [userData.passport.facebook]);

  //Click handler for profile selection
  const handleSelectProfile = (e) => {
    dispatch({
      type: "home/selectProfile",
      target: e.target.id
    })
  }

  return (
    <div className="gridContainerHome">
      <Nav></Nav>
      {
        userData.passport.twitter ? 
          <div style={itemBStyle} className="itemBContainerHome" id="itemBContainerHome" onClick={handleSelectProfile}>
            <img className="itemBAHome" src={twitterURL}  id="itemBContainerHome" onClick={handleSelectProfile}></img>
            <p className="itemBBHome" id="itemBContainerHome" onClick={handleSelectProfile}>{twitterTextOne}</p>
            <p className="itemBCHome" id="itemBContainerHome" onClick={handleSelectProfile}>{twitterTextTwo}</p>
          </div> :
          <form className="itemBContainerHome2" action="http://localhost:4000/twitter/oauth1" method="post">
            <button className="itemBTwitterButton" type="submit"><img src={twitterSignInButton} style={{height: '100%'}}></img></button>
          </form>
      }
      {
        userData.passport.facebook ? 
          <div style={itemCStyle} className="itemCContainerHome" id="itemCContainerHome" onClick={handleSelectProfile}>
            <img className="itemBAHome" src={facebookURL} id="itemCContainerHome" onClick={handleSelectProfile}></img>
            <p className="itemBBHome" id="itemCContainerHome" onClick={handleSelectProfile}>{facebookTextOne}</p>
            <p className="itemBCHome" id="itemCContainerHome" onClick={handleSelectProfile}>{facebookTextTwo}</p>
          </div> :
          <button type="submit" className="itemCContainerHome2"><img src={facebookSignInButton} style={{height: '100%'}} onClick={facebookSignIn}></img></button>
      }
      {
        userData.passport.linkedin ? 
          <div style={itemDStyle} className="itemDContainerHome" id="itemDContainerHome" onClick={handleSelectProfile}>
            <img className="itemBAHome" src={linkedinURL}  id="itemDContainerHome" onClick={handleSelectProfile}></img>
            <p className="itemBBHome" id="itemDContainerHome" onClick={handleSelectProfile}>{linkedinTextOne}</p>
            <p className="itemBCHome" id="itemDContainerHome" onClick={handleSelectProfile}>{linkedinTextTwo}</p>
          </div> :
          <button className="itemDContainerHome2" type="submit"><img src={linkedInSignInButton} style={{height: '100%'}} onClick={linkedinSignIn}></img></button>
      }
      <div className="itemEContainerHome">
        <form style={{display: 'none'}} method='post' action={formAction} id="form1">
        </form>
        <textarea placeholder={textareaPlaceholderText} className="itemEAHome" id='text' name="text" required form="form1"></textarea>
        <input form="form1" type="hidden" id="linkedinID" name="linkedinID" value={linkedinID}></input>
        {
          isFacebookSelected 
          ? <button className="itemEBHome" type="submit" value='submit' onClick={facebookShare}>Spread Misinformation On Facebook</button>
          : <button className="itemEBHome" type="submit" form="form1">{formSubmitText}</button>
        }
      </div>
    </div>
  );
}

export default Home;