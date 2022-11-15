import React from 'react';
import "../styles/Profil.css";
import UpdateProfil from '../components/Profil/UpdateProfil';
import NavLinkMenu from '../components/Nav/NavlinkMenu';


const Profil = () => {
return ( 
    <div className="profil-page"> 
      <div className='logo'>
        <div className='header'>
        <img
          src='images/icon-left-font-monochrome-white.svg'
          alt='logo entreprise'
        /> 
           <NavLinkMenu/>
        </div>
      </div>  
        <UpdateProfil/>
      <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
      </div>
    </div>
    );
};

export default Profil;