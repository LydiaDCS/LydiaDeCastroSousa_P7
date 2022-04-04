import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Profil = () => {
  return (
    <div>
      <NavLink to="/Profil">
      <FontAwesomeIcon className='i' icon="fas fa-user-edit"/>
      </NavLink>
    </div>
  );
};

export default Profil;