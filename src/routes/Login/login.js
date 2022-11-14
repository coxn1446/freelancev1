import React from 'react';
import {
  Link
} from 'react-router-dom';;


const Login = () => {

  return (
    <div>
      <h1>Will's App</h1>
      <p>Login below</p>
      <form action="http://localhost:4000/auth/login" method="post">
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
      <Link to="/register">Register your profile</Link>
    </div>
  );
}

export default Login;