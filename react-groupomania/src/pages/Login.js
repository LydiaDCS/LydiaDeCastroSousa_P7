import React from 'react';
import "../styles/Login.css"
import { NavLink } from 'react-router-dom';
import "../styles/Header.css"
import {useForm} from 'react-hook-form';

const Login = () => {
  localStorage.clear();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const sendRequest = ({email, password}) => {
        fetch(`http://localhost:5050/api/user/login`,{
          method: 'POST',
          headers: {
            'Authorization': 'bearer',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
          }) 
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else{
            alert ("Cet utilisateur n'existe pas !");
          }
        })
        .then((data)=>{
          console.log(data);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("token", data.token);
          localStorage.setItem("firstname", data.firstname);
          localStorage.setItem("lastname", data.lastname);
          window.location.assign("/forum")
        })
        .catch((err) => {
          console.log(err);
        });
      }
       
    return ( < div>
       <div className='logo'>
    <img
    src='images/icon-left-font-monochrome-white.svg'
    alt='logo entreprise'
    />
    </div>
        <div>
        <form className='form' onSubmit={handleSubmit((sendRequest))}>
            <label htmlFor="email">Email :</label>
            <input {...register ("email", {required:true, pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})}  type="email" placeholder="Email" />
            <p className='msgerror'>{errors.email && <span>Adresse e-mail non valide</span>}</p>
            <label htmlFor="password">Mot de passe:</label>
            <input {...register ("password", {required:true, minlengh:4 })}type="password" placeholder="Password"/>
            <p className='msgerror'>{errors.password && <span>Mot de passe incorrect</span>}</p>
             
      <p>Connectez-vous!</p> 
         <button type="submit">
         Connexion
         </button>  
          <div className='redirection'>
              <hr/>
              <p>Pas encore inscrit ?</p>
              <div className='button'>
                <NavLink to = "/Signup" >
                    <li> S'inscrire </li> 
                </NavLink>  
      </div>
          </div>
            </form> 
            <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
    </div>
            </div>
    </div>
    )
};


export default Login;