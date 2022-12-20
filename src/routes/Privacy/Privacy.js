import './privacy.css'
import React from 'react';
import Nav from "../../components/Nav/Nav"



const Privacy = () => {


  return (
    <div className='gridContainerPrivacy'>
        <Nav></Nav>
        <h2 style={{gridColumn: 'span 12'}}>Privacy Policy</h2>
        <p style={{gridColumn: 'span 12'}}>I cannot guarantee anyone's privacy if they choose to use my app. I'm not the greatest developer, it's honestly highly likely I am misusing your data. I will say that my app requires the minimal permission necessary to funciton, just your email and public profile info. In fact, Facebook doesn't require my app to go under a formal review process based on how little data it uses. If I wanted to request permission to read your birthday, for instance, my app would have to be formally reviewed by Facebook before it was published. I didn't want to go through the hassle so I just did the bare minimum. Anyway, if I am misusing your data (again: that's almost a certainty), it probably will not be catastrophic to your personal security.</p>
        <h2 style={{gridColumn: 'span 12'}}>Terms of Service</h2>
        <p style={{gridColumn: 'span 12'}}>Facebook requires me to write these blurbs. I'm not sure if they are going to check them. I do not have any terms to use my app, I am just crossing my fingers hoping it works.</p>
    </div>
  );
}

export default Privacy;