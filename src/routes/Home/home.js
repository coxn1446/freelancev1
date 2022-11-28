import React, {useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from "react-router-dom";

import linkedInSignInButton from "../../resources/linkedinsigninbutton.png"
import facebookSignInButton from "../../resources/facebooksigninbutton.png"
import twitterSignInButton from "../../resources/twittersigninbutton.png"

import {
  selectTwitterURL,
  selectTwitterTextOne,
  selectTwitterTextTwo,
  selectLinkedinURL,
  selectLinkedinTextOne,
  selectLinkedinTextTwo,
  selectFacebookURL,
  selectFacebookTextOne,
  selectFacebookTextTwo} from "../../store/home/home.reducer"

import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "../../store/home/home.actions"

import "./home.css"


const Home = () => {
  const dispatch = useDispatch()

  const twitterURL = useSelector(selectTwitterURL);
  const twitterTextOne = useSelector(selectTwitterTextOne);
  const twitterTextTwo = useSelector(selectTwitterTextTwo);

  const linkedinURL = useSelector(selectLinkedinURL);
  const linkedinTextOne = useSelector(selectLinkedinTextOne);
  const linkedinTextTwo = useSelector(selectLinkedinTextTwo);

  const facebookURL = useSelector(selectFacebookURL);
  const facebookTextOne = useSelector(selectFacebookTextOne);
  const facebookTextTwo = useSelector(selectFacebookTextTwo);


  const [userData] = useOutletContext();
  let formAction = 'http://localhost:4000/auth/test'

  const linkedinSignIn = () => {
    dispatch({type: "home/linkedinSignIn"})
  }

  const facebookSignIn = () => {
    dispatch({type: "home/facebookSignIn"})
  }

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

  return (
    <div className="gridContainerHome">
      <p className="itemAContainerHome">You are logged in as:</p>
      {
        userData.passport.twitter ? 
          <div className="itemBContainerHome">
            <img className="itemBAHome" src={twitterURL}></img>
            <p className="itemBBHome">{twitterTextOne}</p>
            <p className="itemBCHome">{twitterTextTwo}</p>
          </div> :
          <form action="http://localhost:4000/twitter/oauth1" method="post">
            <button type="submit"><img src={twitterSignInButton} style={{height: '25px'}} ></img></button>
          </form>
      }
      {
        userData.passport.facebook ? 
          <div className="itemCContainerHome">
            <img className="itemBAHome" src={facebookURL}></img>
            <p className="itemBBHome">{facebookTextOne}</p>
            <p className="itemBCHome">{facebookTextTwo}</p>
          </div> :
          <button type="submit"><img src={facebookSignInButton} style={{height: '25px'}} onClick={facebookSignIn}></img></button>
      }
      {
        userData.passport.linkedin ? 
          <div className="itemDContainerHome">
            <img className="itemBAHome" src={linkedinURL}></img>
            <p className="itemBBHome">{linkedinTextOne}</p>
            <p className="itemBCHome">{linkedinTextTwo}</p>
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