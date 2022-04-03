import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profil = () => {
  return (
    <div>
      <NavLink to="/Profil">
      <FontAwesomeIcon className='icon' icon="fa-solid fa-user" />
      </NavLink>
    </div>
  );
};

export default Profil;