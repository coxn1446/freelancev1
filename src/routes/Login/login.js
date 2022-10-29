import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  return (
    <div>
      <h1>Will's App</h1>
      <p>Please login using your username and password</p>
      <form method="post">
        <div>
          <input type="text" placeholder="Enter Username" required></input>
          <input type="password" placeholder="Enter Password" required></input>
          <button type="submit">Login</button>
        </div>
        <div>
          <span>Forgot <a>password?</a></span>
        </div>
      </form>
    </div>
  );
}

export default Login;