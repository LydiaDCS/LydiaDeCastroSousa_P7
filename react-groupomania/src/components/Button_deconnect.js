import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button_deconnect = () => {
  return (
    <div>
      <NavLink to ="/login">
      <FontAwesomeIcon className='i' icon="fas fa-sign-out-alt"/>
      </NavLink>
      
    </div>
  );
};

export default Button_deconnect;