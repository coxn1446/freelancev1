import "./Contact.css"
import React from 'react';
import {
	Link
  } from 'react-router-dom';
import Nav from "../../components/Nav/Nav"



const Contact = () => {

  return (
      <div className="itemAContainerBlog">
          <Nav></Nav>
          <div>email: <a href="mailto:freelance1446@gmail.com">freelance1446@gmail.com</a></div>
          <br></br>
          <div>Github: <a href="https://github.com/coxn1446">https://github.com/coxn1446</a></div>
          <br></br>
          <div>linkedIn: <a href="https://www.linkedin.com/in/williamwildernash/">William Wilder Nash</a></div>
          <br></br>
          <div>Zodiac: Gemini</div>

      </div>
  );
}

export default Contact;