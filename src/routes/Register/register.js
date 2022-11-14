import React from 'react';
import {
	Link
  } from 'react-router-dom';;


const Register = () => {

  return (
    <div>
        <h1>Will's App</h1>
        <p>Please fill in the following information in order to create a profile.</p>
        <form action="http://localhost:4000/auth/register" method="post">
				<section>
					<label htmlFor="username">Username</label>
					<input id="username" name="username" type="text" autoComplete="username" required></input>
				</section>
				<section>
					<label htmlFor="new-password">Password</label>
					<input id="new-password" name="password" type="password" autoComplete="new-password" required></input>
				</section>
				<button type="submit">Sign up</button>
			</form>
		<Link to="/login">Already have a profile?</Link>
    </div>
  );
}

export default Register;