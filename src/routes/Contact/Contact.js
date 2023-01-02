import "./Contact.css"
import React from 'react';
import Nav from "../../components/Nav/Nav"



const Contact = () => {

  return (
      <div className="itemAContainerContact">
          <Nav></Nav>
          <div className="paragraphBlog">email: <a href="mailto:freelance1446@gmail.com">freelance1446@gmail.com</a></div>
          <br></br>
          <div className="paragraphBlog">Github: <a href="https://github.com/coxn1446">https://github.com/coxn1446</a><a href="https://github.com/coxn1446/freelancev1"> (source code for this project)</a></div>
          <br></br>
          <div className="paragraphBlog">Instagram: <a href="https://www.instagram.com/williamwildernash/">williamwildernash</a></div>
          <br></br>
          <div className="paragraphBlog">linkedIn: <a href="https://www.linkedin.com/in/williamwildernash/">William Wilder Nash</a></div>
          <br></br>
          <div className="paragraphBlog">Co-Star: @wnash1995 (Gemini)</div>
          <br></br>

      </div>
  );
}

export default Contact;