import React from 'react';
import "../styles/Signup.css"
import { NavLink } from 'react-router-dom';
import "../styles/Button.css";
import "../styles/Header.css"
import {useForm} from 'react-hook-form';


const Signup = () => {
  localStorage.clear();
  const {register, handleSubmit, formState:{errors}} = useForm();

    const sendRequest = ({firstName, lastName, email, password}) => {
      fetch("http://localhost:5050/api/user/signup",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        })
      })
      .then((res) => {
        if (res.ok) {
            window.location.assign("/login");
        } alert ("Utilisateur créé ! Veuillez vous connecter");
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
    <div>
      <div className='logo'>
    <img
    src='images/icon-left-font-monochrome-white.svg'
    alt='logo entreprise'
    />
    </div>
        <div className='log'>
        <div>
        <NavLink to = "/Login" >
          <li className='seconnect'> Se Connecter </li> 
        </NavLink> 
    </div>
        </div>
        <form className='form' onSubmit={handleSubmit((sendRequest))}>
        <label htmlFor="firstName">Prénom :</label>
        <input {...register ("firstName", {required:true})} type="text" placeholder="Prénom" autoComplete='off' 
        />
        <p className='msgerror'>{errors.firstName && <span> Ce champ est obligatoire</span>}</p>
        
        <label htmlFor="lastName">Nom :</label>
        <input type="text" {...register ("lastName", {required:true , minlengh:2})} placeholder="Nom" autoComplete='off'
        />
        <p className='msgerror'>{errors.lastName && <span> Ce champ est obligatoire</span>}</p>

        <label htmlFor="email">Email :</label>
        <input type="email" {...register ("email", {required:true , pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})} placeholder="Email" autoComplete='off'
        />
        <p className='msgerror'>{errors.email && <span>Veuillez entrer une adresse mail valide</span>}</p>

        <label htmlFor="password">Mot de passe :</label>
        <input type="password" {...register ("password", {required:true})} placeholder="Password" autoComplete='off'
        />
        <p className='msgerror'>{errors.password && <span> Mot de passe incorrect</span>}</p>
      
      <p>Inscrivez-vous!</p>
      
        <button type="submit">
           S'inscrire 
        </button>
        </form> 
        <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
    </div>
    </div>
  );
}

export default Signup;