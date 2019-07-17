import React from 'react';
import { NavLink } from 'react-router-dom';
import wineglass1 from '../images/wineglass1.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import facebook from '../images/facebook.png'



const Navbar = () => (
  <nav>
    <ul>
      <li>
        {' '}
        <NavLink className="nav-item" exact to="/">
          <img src={wineglass1} id="wineglass1" alt="winebottle-icon" />{' '}
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" exact to="/Random-drink">
          Random Drink
        </NavLink>
      </li>

      <span id="nav-social">

      <li>

      <a className="nav-item" href="https://www.facebook.com/wyncode/">
        <img src={facebook} id="facebook" alt="facebook-icon" />
        </a>{' '}
      </li>
      <li>
      <a className="nav-item" href="https://twitter.com/wyncode">
          <img src={twitter} id="twitter" alt="twitter-icon" /> </a>{' '}
      </li>
      <li>
      <a className="nav-item" href="https://www.instagram.com/wyncode/?hl=en">
          <img src={instagram} id="instagram" alt="instagram-icon" /> </a>{' '}
      </li>
      </span>
    </ul>
  </nav>
);
export default Navbar;
