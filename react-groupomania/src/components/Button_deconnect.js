import React from 'react';
import { NavLink } from 'react-router-dom';

const Button_deconnect = () => {
  return (
    <div>
      <NavLink to ="/login">
      <button className='logout'>
        Deconnexion
      </button>
      </NavLink>
      
    </div>
  );
};

export default Button_deconnect;