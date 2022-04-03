import React from 'react';
import { NavLink } from 'react-router-dom';

const Button_forum = () => {
  return (
    <div>
      <NavLink to ="/Forum">
      <button className='return_forum'>
        Forum
      </button>
      </NavLink>
    </div>
  );
};

export default Button_forum;