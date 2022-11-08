import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  return (
    <div>
      <h1>Will's App</h1>
      <p>Please click this button</p>
      <form action="http://localhost:4000/login" method="get">
				<button type="submit">Sign In</button>
			</form>
      <form action="http://localhost:4000/login/logout" method="post">
				<button type="submit">Logout</button>
			</form>
    </div>
  );
}

export default Login;