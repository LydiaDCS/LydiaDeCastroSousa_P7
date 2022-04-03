import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Button.css";

const Button_log = () => {
  return (
    <div>
        <NavLink to = "/Login" >
          <li className='seconnect'> Se Connecter </li> 
        </NavLink> 
    </div>
  );
};

export default Button_log;