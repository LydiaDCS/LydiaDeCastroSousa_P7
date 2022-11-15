import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavlinkMenu_Desktop = () => {
  return (
    <div>
      <ul className='nav_list_desktop'>
              <NavLink to ="/Forum">
                <FontAwesomeIcon className='i' icon="fas fa-home"/>
              </NavLink>
              <NavLink to="/message">
                <FontAwesomeIcon className='i_desktop' icon="fa-comments"/>
              </NavLink>
            <div>
              <NavLink to="/Profil">
                <FontAwesomeIcon className='i_desktop' icon="fas fa-user-edit"/>
              </NavLink>
            </div>
            <NavLink to ="/login">
              <FontAwesomeIcon className='i_desktop' icon="fas fa-sign-out-alt"/>
            </NavLink>
        </ul>
    </div>
  );
};

export default NavlinkMenu_Desktop;