import React from 'react';
import { NavLink } from 'react-router-dom';
import drink1 from '../images/drink1.png';

const Navbar = () => (
  <nav>
    <ul>
      <li className="list">
        {' '}
        <NavLink exact to="/Logo">
          <img src={drink1} id="drink1" alt="drink-icon" />{' '}
        </NavLink>
      </li>
      <li className="list">
        <NavLink exact to="/Random-drink">
          Random Drink
        </NavLink>
      </li>
      {/* <li className="list"><NavLink exact to="/Sign-in">Sign in</NavLink></li> */}
    </ul>
  </nav>
);
export default Navbar;
