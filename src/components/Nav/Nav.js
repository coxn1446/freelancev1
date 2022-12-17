import './Nav.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Nav = () => {
  
  return (
    <div className="itemAContainerNav">
        <Link to="/" className="itemAANav">Social</Link>
        <Link reloadDocument to="/blog" className="itemAANav">Blog</Link>
        <Link to="/contact" className="itemAANav">Contact</Link>
        <form className="itemACNav" action="http://localhost:4000/auth/logout" method="post">
          <button className="navButton" type="submit" value='submit'>Logout</button>
        </form>

    </div>

  );
}

export default Nav;