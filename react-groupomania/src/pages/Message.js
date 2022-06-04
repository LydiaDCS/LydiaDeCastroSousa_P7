import React from 'react';
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Message.css'
import { NavLink } from 'react-router-dom';

const Message = () => {
  return (
    <div>
       <div className='logo'>
        <div className='header'>
    <img
    src='images/icon-left-font-monochrome-white.svg'
    alt='logo entreprise'
    /> 
     <nav className='nav'>
                <ul className='nav_list'>         
      <NavLink to="/Profil">
      <FontAwesomeIcon className='i' icon="fas fa-user-edit"/>
      </NavLink>
      <NavLink to ="/Forum">
      <FontAwesomeIcon className='i' icon="fas fa-home"/>
      </NavLink>
                    <Button_deconnect/>
                </ul>
        </nav>
     </div>
      </div> 
       <div className='message_body'>
      <h1 className='nomsg'>Pas de messages...</h1>
      </div>
      <br/>
      <br/>
      <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
    </div>
    </div>
  );
};

export default Message;