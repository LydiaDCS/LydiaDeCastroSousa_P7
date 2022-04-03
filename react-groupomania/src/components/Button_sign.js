import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Button.css"

const Button_sign = () => {
  return (
      <div className='button'>
                <NavLink to = "/Signup" >
                    <li> S'inscrire </li> 
                </NavLink>  
      </div>
  );
};

export default Button_sign;