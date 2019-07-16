import React from 'react';
import { NavLink } from 'react-router-dom';
import drink1 from '../images/drink1.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import facebook from '../images/facebook.png'



const Navbar = () => (
  <nav>
    <ul>
      <li>
        {' '}
        <NavLink className="nav-item" exact to="/">
          <img src={drink1} id="drink1" alt="drink-icon" />{' '}
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" exact to="/Random-drink">
          Random Drink
        </NavLink>
      </li>
      <li>
      <NavLink className="nav-item" exact to="/">
          <img src={facebook} id="facebook" alt="facebook-icon" />{' '}
        </NavLink>
      </li>
      <li>
      <NavLink className="nav-item" exact to="/">
          <img src={twitter} id="twitter" alt="twitter-icon" />{' '}
        </NavLink>
      </li>
      <li>
      <NavLink className="nav-item" exact to="/">
          <img src={instagram} id="instagram" alt="instagram-icon" />{' '}
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Navbar;
