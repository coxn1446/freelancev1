import React from 'react';
//import { Form, Formik } from 'formik';
//import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from "react-router-dom";



const Home = () => {
  const [username] = useOutletContext();
  let formAction = 'http://localhost:4000/auth/test'

  return (
    <div>
      <p>Welcome home, {username}.</p>
      <form method='get' action={formAction} >
        <textarea rows='10' cols='50'></textarea>
        <input type='submit' value='submit'></input>
      </form>

      <form action="http://localhost:4000/twitter/twitteroauth" method="post">
				<button type="submit" value='twitter test'>Twitter Test</button>
			</form>


      <form action="http://localhost:4000/auth/logout" method="post">
				<button type="submit" value='submit'>Logout</button>
			</form>
    </div>
  );
}

export default Home;