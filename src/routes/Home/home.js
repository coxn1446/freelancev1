import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';


const Home = () => {

  return (
    <div>
      <p>Hello, you are logged in.</p>
      <form action="http://localhost:4000/auth/logout" method="post">
				<button type="submit">Logout</button>
			</form>
    </div>
  );
}

export default Home;