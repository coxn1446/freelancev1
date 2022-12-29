import React from 'react';
import {
  Link,
  useSearchParams
} from 'react-router-dom';

import "./login.css"

import freelanceLogo from "../../resources/Freelance v1-logos/Freelance v1-logos.jpeg";


const Login = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status")
  function alert () {
    window.alert('If you have forgotten your password, then your account is lost forever. I could help you, but wont. Let this be a lesson to you in accountability.')
  }

  return (
    <div className="loginPage">
      <img src={freelanceLogo} alt="freelance logo" className="logoLogin"/>
      {
        status ? <div style={{textAlign: 'center', color: 'red'}}>{status}</div> : null
      }
      <form action="/auth/login" method="post" className="loginForm">
        <section>
            <input placeholder="username" className="loginInput" id="username" name="username" type="text" autoComplete="username" required autoFocus></input>
        </section>
        <section>
            <input placeholder="password" className="loginInput" id="current-password" name="password" type="password" autoComplete="current-password" required></input>
        </section>
        <button className="loginSubmit" type="submit">Sign in</button>
      </form>
      <br></br>
      <p className="loginParagraph">Don't have an account yet?</p>
      <div className="loginRegisterLink">
          <Link style={{textDecoration: "none"}} to="/register"><button className="loginRegisterLinkButton"><p style={{margin: 0, width: "100%"}}>Register</p></button></Link>
      </div>
      <br></br>
      <p className="loginParagraph" id="secondLoginParagraph" onClick={alert}>Forget password?</p>
    </div>
  );
}

export default Login;