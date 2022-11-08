import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  return (
    <div>
      <h1>Will's App</h1>
      <p>Please click this button</p>
      <form action="http://localhost:4000/login" method="post">
    <section>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required autoFocus></input>
    </section>
    <section>
        <label htmlFor="current-password">Password</label>
        <input id="current-password" name="password" type="password" autoComplete="current-password" required></input>
    </section>
    <button type="submit">Sign in</button>
</form>
    </div>
  );
}

export default Login;