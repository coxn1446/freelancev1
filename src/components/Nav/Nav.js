import './Nav.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Nav = () => {
  
  return (
    <nav className="itemAContainerNav">
        <Link to="/" className="itemAANav">Home</Link>
        <Link to="/blog" className="itemAANav">Blog</Link>
        <form className="itemACNav" action="http://localhost:4000/auth/logout" method="post">
          <button className="navButton" type="submit" value='submit'>Logout</button>
        </form>
    </nav>

  );
}

export default Nav;