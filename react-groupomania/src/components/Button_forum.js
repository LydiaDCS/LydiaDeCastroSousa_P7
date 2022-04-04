import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button_forum = () => {
  return (
    <div>
      <NavLink to ="/Forum">
      <FontAwesomeIcon className='i' icon="fas fa-home"/>
      </NavLink>
    </div>
  );
};

export default Button_forum;