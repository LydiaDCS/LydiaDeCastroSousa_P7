/*import React, { useState } from 'react';*/
import '../styles/Forum.css'
import NavLinkMenu from '../components/Nav/NavlinkMenu';
import {useForm} from 'react-hook-form';
/* import { NavLink } from 'react-router-dom'; */
/* import NavlinkMenu_Desktop from '../components/Nav/NavlinkMenu_Desktop'; */
/* import { useState, useEffect } from 'react';//pour ecrire un post 
// useeffect pour mettre a jour et afficher post apres avoir publier le msg */


const Message = (Post, updatePost) => {
  let firstname = localStorage.getItem("firstname");


  const {register, handleSubmit, formState:{errors}} = useForm();
// Poster un message
    const sendRequest = ({title, content, attachment, like}) => {
      fetch("http://localhost:5050/api/user/forum", {
        method: 'POST',
        headers: {
          'Authorization':'bearer',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          attachment,
          like,
        })
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        } else{
          alert ("Impossible de poster le message");
        }
      })
        .then(({ data }) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  } 


    return (
    <div className='logo'>
        <div className='header'>
          <img
          src='images/icon-left-font-monochrome-white.svg'
          alt='logo entreprise'/>

        <nav className='nav'>
          <h4>Bienvenue {firstname}</h4><br/>
          <NavLinkMenu/>

        </nav>
        <div>
    </div>
        </div>
        <form className='page' onSubmit={handleSubmit((sendRequest))}>
        <label htmlFor="title">Titre :</label>
        <input {...register ("title", {required:true})} type="text" placeholder="Titre" autoComplete='off' 
        />
        <p className='msgerror'>{errors.title && <span> Ce champ est obligatoire</span>}</p>
        
        <label htmlFor="content">message :</label>
        <input type="text" {...register ("content", {required:true , minlengh:2})} placeholder="Message" autoComplete='off'
        />
        <p className='msgerror'>{errors.content && <span> Ce champ est obligatoire</span>}</p>



        <button type="submit">
           Envoyer 
        </button>
        </form> 

        <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
    </div>
    </div> 
  );
}

export default Message;

