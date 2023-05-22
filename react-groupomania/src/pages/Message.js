import React from 'react';
import '../styles/Message.css'
import NavLinkMenu from '../components/Nav/NavlinkMenu';



const Message = () => {
  return ( 
    <div> 
      <div className='logo'>
        <div className='header'>
        <img
          src='images/icon-left-font-monochrome-white.svg'
          alt='logo entreprise'
        /> 
          <NavLinkMenu/>
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