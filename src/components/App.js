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

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;