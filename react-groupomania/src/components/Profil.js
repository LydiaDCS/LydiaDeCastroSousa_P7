import React from 'react';
import { NavLink } from 'react-router-dom';

const Profil = () => {
  return (
    <div>
      <NavLink to="/Profil">
      <i class="fas fa-user-edit"></i>
      </NavLink>
    </div>
  );
};

export default Profil;