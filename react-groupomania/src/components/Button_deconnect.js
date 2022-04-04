import React from 'react';
import { NavLink } from 'react-router-dom';

const Button_deconnect = () => {
  return (
    <div>
      <NavLink to ="/login">
      <i class="fas fa-sign-out-alt"></i>
      </NavLink>
      
    </div>
  );
};

export default Button_deconnect;