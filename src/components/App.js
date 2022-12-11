import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Login from "../routes/Login/login"
import Home from "../routes/Home/home"
import Register from "../routes/Register/register"
import PrivateRoutes from "./PrivateRoute"
import Twitter from "../routes/Twitter/twitter"
import LinkedIn from "../routes/Linkedin/linkedin"
import Facebook from "../routes/Facebook/facebook"
import Blog from "../routes/Blog/Blog"



function App() {

  return (
    <div className="gridContainer">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/twitter" exact element={<Twitter/>}/>
            <Route path="/linkedin" exact element={<LinkedIn/>}/>
            <Route path="/facebook" exact element={<Facebook/>}/>
            <Route path="/blog" exact element={<Blog/>}/>
          </Route>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
