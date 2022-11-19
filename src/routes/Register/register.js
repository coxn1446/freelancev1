import './register.css'
import freelanceLogo from '../../resources/Freelance v1-logos/Freelance v1-logos.jpeg'
import React, {useState} from 'react';
import {
	Link
  } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {selectDisplayType1, selectDisplayType2, selectDisplayType3} from "../../store/register/register.reducer"



const Register = () => {
	const dispatch = useDispatch();
	const displayType1 = useSelector(selectDisplayType1);
	const displayType2 = useSelector(selectDisplayType2);
	const displayType3 = useSelector(selectDisplayType3);

    function handleChoice(e){
        dispatch({
          type: 'register/classChange',
		  target: e.target.id
        })
      }

  return (
    <div className='registerPage'>
		<img src={freelanceLogo} alt="freelance logo" className="logoregister"/>
        <p className='registerParagraph'>Please fill in the following information in order to create a profile.</p>
        <form className='registerForm' action="http://localhost:4000/auth/register" method="post">
			<section>
				<input className='registerInput'placeholder='first name' id="firstname" name="firstname" type="text"></input>
			</section>
			<section>
				<input className='registerInput'placeholder='last name' id="lastname" name="lastname" type="text"></input>
			</section>
			<section>
				<input className='registerInput' placeholder='username' id="username" name="username" type="text" autoComplete="username" required></input>
			</section>
			<section>
				<input className='registerInput'placeholder='password' id="new-password" name="password" type="password" autoComplete="new-password" required></input>
			</section>
			<section>
				<legend>Do you live in NYC?</legend>
				<label htmlFor='radioChoice1a'>Yes</label>
				<input type='radio' id='radioChoice1a' name='choice1' value='Yes' onClick={handleChoice}></input>
				<label htmlFor='radioChoice1b'>No</label>
				<input type='radio' id='radioChoice1b' name='choice1' value='No' onClick={handleChoice}></input>
			</section>
			<section style={{display: displayType1}}>
				<legend>Are you a woman A25-34?</legend>
				<label htmlFor='radioChoice2a'>Yes</label>
				<input type='radio' id='radioChoice2a' name='choice2' value='Yes' onClick={handleChoice}></input>
				<label htmlFor='radioChoice2b'>No</label>
				<input type='radio' id='radioChoice2b' name='choice2' value='No' onClick={handleChoice}></input>
			</section>
			<section style={{display: displayType2}}>
				<legend>Are you free this Thursday at 8:30PM?</legend>
				<label htmlFor='radioChoice3a'>Yes</label>
				<input type='radio' id='radioChoice3a' name='choice3' value='Yes' onClick={handleChoice}></input>
				<label htmlFor='radioChoice3b'>No</label>
				<input type='radio' id='radioChoice3b' name='choice3' value='No' onClick={handleChoice}></input>
			</section>
			<section style={{display: displayType3}}>
				<input className='registerInput'placeholder='phone number' id="phonenumber" name="phonenumber" type="text"></input>
			</section>
			<button className='registerSubmit'type="submit">Register</button>
		</form>
		<br></br>
		<p className='registerParagraph'>Already have a profile?</p>
		<div className="registerLoginLink">
        <button className="registerLoginLinkButton">
          <Link className="registerLoginText" to="/login">Login</Link>
        </button>
      </div>
	  <br></br>
    </div>
  );
}

export default Register;