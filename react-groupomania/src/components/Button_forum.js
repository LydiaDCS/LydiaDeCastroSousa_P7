import React from 'react';
import { NavLink } from 'react-router-dom';

const Button_forum = () => {
  return (
    <div>
      <NavLink to ="/Forum">
      <i class="fas fa-home"></i>
      </NavLink>
    </div>
  );
};

export default Button_forum;