import React from 'react';
import Button_deconnect from '../components/Button_deconnect';
import Button_forum from '../components/Button_forum';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profil from '../components/Profil';
import '../styles/Message.css'

const Message = () => {
  return (
    <div>
       <Header/>
       <nav className='nav'>
        <Button_forum/>
         <Profil/>
         <Button_deconnect/>
       </nav>
       <div className='message_body'>
      <h1 className='nomsg'>Pas de messages...</h1>
      </div>
      <Footer/>
    </div>
  );
};

export default Message;