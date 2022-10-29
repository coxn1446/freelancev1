import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';


const Register = () => {
    function preventDefault() {
        return false
    }

  return (
    <div>
        <h1>Will's App</h1>
        <p>Please fill in the following information in order to create a profile.</p>
        <form method="post">
        <div>
            <label for="firstName">First Name</label>
            <input type="text" placeholder="First Name" name="firstName" id="firstName" required></input>
        </div>
        <div>
            <label for="lastName">Last Name</label>
            <input type="text" placeholder="Last Name" name="lastName" id="lastName" required></input>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" placeholder="Password" name="password" id="password" required></input>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" placeholder="Email" name="email" id="email" required></input>
        </div>
            <button type="submit">Submit</button>
        </form>
        <button type="submit">Click Me</button>
    </div>
  );
}

export default Register;