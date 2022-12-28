import React, {useMemo, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Ad from "../../components/Ad/Ad"

import linkedInSignInButton from "../../resources/linkedinsigninbutton.png"
import facebookSignInButton from "../../resources/facebooksigninbutton.png"
import twitterSignInButton from "../../resources/twittersigninbutton.png"

import * as socialState from "../../store/social/social.reducer"

import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "../../store/social/social.actions"

import "./Social.css"


const Social = () => {
  //Creates useDispatch instance
  const dispatch = useDispatch()

  //Pulls parameters from URL to use in conditional logic below
  const [searchParams, setSearchParams] = useSearchParams();

  //Add the other options
  const status = searchParams.get("status")

  //Pulls in Redux state variables
  const horoscope = useSelector(socialState.selectHoroscope);

  const twitterURL = useSelector(socialState.selectTwitterURL);
  const twitterTextOne = useSelector(socialState.selectTwitterTextOne);
  const twitterTextTwo = useSelector(socialState.selectTwitterTextTwo);

  const linkedinURL = useSelector(socialState.selectLinkedinURL);
  const linkedinTextOne = useSelector(socialState.selectLinkedinTextOne);
  const linkedinTextTwo = useSelector(socialState.selectLinkedinTextTwo);
  const linkedinID = useSelector(socialState.selectLinkedinID);

  const facebookURL = useSelector(socialState.selectFacebookURL);
  const facebookTextOne = useSelector(socialState.selectFacebookTextOne);
  const facebookTextTwo = useSelector(socialState.selectFacebookTextTwo);

  const formSubmitText = useSelector(socialState.selectFormSubmitText)
  const maxLength = useSelector(socialState.selectMaxLength)
  const formAction = useSelector(socialState.selectFormAction)
  const textareaPlaceholderText = useSelector(socialState.selectTextareaPlaceholderText)
  const isFacebookSelected = useSelector(socialState.selectIsFacebookSelected)
  const itemBStyle = useSelector(socialState.selectItemBStyle)
  const itemCStyle = useSelector(socialState.selectItemCStyle)
  const itemDStyle = useSelector(socialState.selectItemDStyle)

  //Allows the use of props passed in from Routes Outlet
  const [cookieData, userData] = useOutletContext();

  //Redirects user to LinkedIn login page
  const linkedinSignIn = () => {
    dispatch({type: "social/linkedinSignIn"})
  }

  //Redirects user to Facebook login page
  const facebookSignIn = () => {
    dispatch({type: "social/facebookSignIn"})
  }

  //Redirects user to Facebook share dialogue
  const facebookShare = () => {
    if(process.env.REACT_APP_NODE_ENV === "development"){
      window.location.assign(`https://www.facebook.com/dialog/feed?app_id=1552095471881422&display=page&link=https://www.freelancev1.comm/&redirect_uri=http://localhost:3000?status=facebookPostSent`)
    }
    if(process.env.REACT_APP_NODE_ENV === "production"){
      window.location.assign(`https://www.facebook.com/dialog/feed?app_id=1552095471881422&display=page&link=https://www.freelancev1.comm/&redirect_https://www.freelancev1.commm.com?status=facebookPostSent`)
    }
  }

  //Checks whether user is logged into social media account.
  //If they are, makes a call to the respective social API to pull user info
  //useMemo() ensures this call is only made once instead of at each component level
  useMemo(() => {
    if(cookieData.passport.twitter){
      dispatch(getTwitterInfo(cookieData.passport.twitter[3]))
    }
  }, [cookieData.passport.twitter]);

  useMemo(() => {
    if(cookieData.passport.linkedin){
      dispatch(getLinkedinInfo())
      dispatch({type: "social/linkedinChooseJob"})
    }
  }, [cookieData.passport.linkedin]);

  useMemo(() => {
    if(cookieData.passport.facebook){
      dispatch(getFacebookInfo1(cookieData.passport.facebook.access_token))
      dispatch(getFacebookInfo2(cookieData.passport.facebook.access_token))
    }
  }, [cookieData.passport.facebook]);

  //Click handler for profile selection
  const handleSelectProfile = (e) => {
    dispatch({
      type: "social/selectProfile",
      target: e.target.id
    })
  }

  //chooses random horoscope
  useEffect(() => {
    dispatch({
      type: "social/chooseHoroscope"
    })
  })

  useEffect(() => {
    dispatch({
      type: "social/changeTextAreaText",
      target: status
    })
  },[status])

  //creates a new Date object
  const date = new Date()

  return (
    <div className="gridContainerSocial">
      <Nav></Nav>
      <Ad></Ad>
      <p className="itemBSocial" >Hello, {userData.firstname} {userData.lastname}. Today's date is {date.toLocaleDateString()}. Your horoscope for the day is:</p>
      <p className="itemCSocial" >"{horoscope}"</p>
      {
        cookieData.passport.twitter ? 
          <div style={itemBStyle} className="itemDContainerSocial" id="itemDContainerSocial" onClick={handleSelectProfile}>
            <img className="itemDASocial" src={twitterURL}  id="itemDContainerSocial" onClick={handleSelectProfile}></img>
            <p className="itemDBSocial" id="itemDContainerSocial" onClick={handleSelectProfile}>{twitterTextOne}</p>
            <p className="itemDCSocial" id="itemDContainerSocial" onClick={handleSelectProfile}>{twitterTextTwo}</p>
          </div> :
          <form className="itemDContainerSocial2" action="/twitter/oauth1" method="post">
            <button className="itemDTwitterButton" type="submit"><img src={twitterSignInButton} style={{height: '100%'}}></img></button>
          </form>
      }
      {
        cookieData.passport.facebook ? 
          <div style={itemCStyle} className="itemEContainerSocial" id="itemEContainerSocial" onClick={handleSelectProfile}>
            <img className="itemDASocial" src={facebookURL} id="itemEContainerSocial" onClick={handleSelectProfile}></img>
            <p className="itemDBSocial" id="itemEContainerSocial" onClick={handleSelectProfile}>{facebookTextOne}</p>
            <p className="itemDCSocial" id="itemEContainerSocial" onClick={handleSelectProfile}>{facebookTextTwo}</p>
          </div> :
          <button type="submit" className="itemEContainerSocial2"><img src={facebookSignInButton} style={{height: '100%'}} onClick={facebookSignIn}></img></button>
      }
      {
        cookieData.passport.linkedin ? 
          <div style={itemDStyle} className="itemFContainerSocial" id="itemFContainerSocial" onClick={handleSelectProfile}>
            <img className="itemDASocial" src={linkedinURL}  id="itemFContainerSocial" onClick={handleSelectProfile}></img>
            <p className="itemDBSocial" id="itemFContainerSocial" onClick={handleSelectProfile}>{linkedinTextOne}</p>
            <p className="itemDCSocial" id="itemFContainerSocial" onClick={handleSelectProfile}>{linkedinTextTwo}</p>
          </div> :
          <button className="itemFContainerSocial2" type="submit"><img src={linkedInSignInButton} style={{height: '100%'}} onClick={linkedinSignIn}></img></button>
      }
      <div className="itemGContainerSocial">
        <form style={{display: 'none'}} method='post' action={formAction} id="form1">
        </form>
        <textarea style={{'resize': 'none', 'overflow':'scroll'}} placeholder={textareaPlaceholderText} className="itemGASocial" id='text' name="text" maxLength={maxLength} required form="form1"></textarea>
        <input form="form1" type="hidden" id="linkedinID" name="linkedinID" value={linkedinID}></input>
        {
          isFacebookSelected 
          ? <button className="itemGBSocial" type="submit" value='submit' onClick={facebookShare}>Spread Misinformation On Facebook</button>
          : <button className="itemGBSocial" type="submit" form="form1">{formSubmitText}</button>
        }
      </div>
    </div>
  );
}

export default Social;