import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


//Public Routes
import Login from "../routes/Login/login"
import Register from "../routes/Register/register"
import Privacy from "../routes/Privacy/Privacy"

//This is a component which checks if you are logged in
import PrivateRoutes from "./PrivateRoute"

//Private Routes, only accessible after passing through <PrivateRoutes> component
import Social from "../routes/Social/Social"
import Twitter from "../routes/Twitter/twitter"
import LinkedIn from "../routes/Linkedin/linkedin"
import Facebook from "../routes/Facebook/facebook"
import Blog from "../routes/Blog/Blog"
import Contact from "../routes/Contact/Contact"



function App() {

  return (
    <div className="gridContainer">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/" exact element={<Social/>}/>
            <Route path="/twitter" exact element={<Twitter/>}/>
            <Route path="/linkedin" exact element={<LinkedIn/>}/>
            <Route path="/facebook" exact element={<Facebook/>}/>
            <Route path="/blog" exact element={<Blog/>}/>
            <Route path="/contact" exact element={<Contact/>}/>
          </Route>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/privacy" element={<Privacy></Privacy>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
