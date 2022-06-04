import React, { useEffect, useState } from 'react';
import "../styles/Forum.css";
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Forum = (title, content, attachment, like) => {
  let lastname =localStorage.getItem("lastname");
  let firstname =localStorage.getItem("firstname");
  let token = localStorage.getItem("token");

  //afficher les messages
  const [message, setMessage] = useState([]);
  
  useEffect(()=>{
    fetch("http://localhost:5050/api/forum",{
      method: 'GET',
      headers: {
        'Authorization':'Bearer ' + token
      }
    })
    .then(message => setMessage(message))
    .catch(err => console.log(err))
},[])

  //envoyer message
    const sendMessage = (e)=>{
        fetch("http://localhost:5050/api/forum",{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title:e.target.title,
              content:e.target.content,
              attachment:e.target.attachment,
              likes:0
            })
          })
          .then((res) => {
            if (res.ok) {
            } alert ("Message posté !");
          })
          .catch((err) => {
            console.log(err);
          });
        } 

    return ( <div >
        
      <div className='logo'>
        <div className='header'>
    <img
    src='images/icon-left-font-monochrome-white.svg'
    alt='logo entreprise'
    /> 
     <nav className='nav'>
     <h4> Bienvenue {firstname} </h4> <br/>
                <ul className='nav_list'>
                <NavLink to="/message">
                        <FontAwesomeIcon className='i' icon="fa-comments"/>
                        </NavLink>
                    <div>
      <NavLink to="/Profil">
      <FontAwesomeIcon className='i' icon="fas fa-user-edit"/>
      </NavLink>
    </div>
                    <Button_deconnect/>
                </ul>
        </nav>
     </div>
      </div> 
        <div className='page'>
        <section className='main'>
        <div className="poster">
        <form onSubmit={sendMessage} >
            <div className="poster-header">
                <img alt="profil" className="profil-picture-forum" src="" />
                <p>{lastname} {firstname}</p> 
            </div>
            <div className='poster-main'>
            <label htmlFor="text-post"></label>
            <input type="text" placeholder='Titre' className="titre-post" ></input>
            <br/><br/>
            <textarea type="text" name="text-post" className="text-post" id="text-post" placeholder="Exprimez-vous" ></textarea>
            <br/>
                <input type="file" id="file-input-poster" className='buttons' accept="images/*"/>
            </div>

<button type="submit" id="submit-post"> Envoyer</button>
        </form>
        </div>
        <br/>
        
        </section>
        </div>
        <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
        </div>
         
        </div>
    );
};
export default Forum;