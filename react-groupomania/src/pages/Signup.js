import React from 'react';
import "../styles/Signup.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_log from '../components/Button_log';
import {useForm} from 'react-hook-form';
import { useState } from 'react';

const Signup = () => {
  const {register, errors} = useForm();
  const [user, setUser] =useState([]);
 
    const handleSubmit=(e)=>{ 
    /* //adresse modifier
    fetch('http://localhost:3000/Signup',{
      method: 'POST',
      data:{
        firstName:this.firstName,
        lastName:this.lastName,
        email: this.email,
        password:this.password
      }
    })
    .then((res) => {
      if (res.ok) {
          return res.json();
      }
    })
    .then((data) => {
      let User = data.orderId;
      window.location.assign("/forum");
  }) */
  } 
    return (
    <div>
      <Header/>
        <div className='log'>
        <Button_log/>
        </div>
        <form className='form' onSubmit={handleSubmit((data)=>{
          console.log(data);
        })}>
        <label for="firstName">Prénom :</label>
        <input {...register ("firstName", {required : true})} type="text" placeholder="Prénom" 
        />
        
        <label for="lastName">Nom :</label>
        <input type="text" {...register ("lastName", {required : true, minlengh:2})} placeholder="Nom" 
        
        />
        <label for="email">Email :</label>
        <input type="email" {...register ("email", {required:true, pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})} placeholder="Email" 
        
        />
        <label for="password">Mot de passe :</label>
        <input type="text" {...register ("password", {required:true, minlengh:4 })} placeholder="Password" 
        />
      
      <p>Inscrivez-vous!</p>

        <button type="submit" onClick={handleSubmit}>
         <a class="buttoninfo" href="Forum">
           S'inscrire
        </a> 
        </button>
        
      
        </form> 
        <Footer/>
    </div>
  );
}

export default Signup;