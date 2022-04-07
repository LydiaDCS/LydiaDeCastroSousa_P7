import React from 'react';
import "../styles/Signup.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_log from '../components/Button_log';
import {useForm} from 'react-hook-form';

const Signup = (data) => {
  const {register, 
    handleSubmit} = useForm();

    const sendRequest =(data) => {
      fetch(`http://localhost:3000/api/user/signup`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data : {
          firstName: data.firstName,
          lastName:data.lastName,
          email: data.email,
          password:data.password,
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        }
      })
      .then((data) => {
        let user = data;
        console.log(data);
        /* window.location.assign("/login"); */
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
    <div>
      <Header/>
        <div className='log'>
        <Button_log/>
        </div>
        <form className='form' onSubmit={handleSubmit((user)=> sendRequest(user))}>
        <label htmlFor="firstName">Prénom :</label>
        <input {...register ("firstName", {required : 'Ce champ est obligatoire'})} type="text" placeholder="Prénom" autoComplete='off' 
        />
        
        <label htmlFor="lastName">Nom :</label>
        <input type="text" {...register ("lastName", {required : 'Ce champ est obligatoire', minlengh:2})} placeholder="Nom" autoComplete='off'
        />

        <label htmlFor="email">Email :</label>
        <input type="email" {...register ("email", {required:'Veuillez entrer une adresse mail valide', pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})} placeholder="Email" autoComplete='off'
        />

        <label htmlFor="password">Mot de passe :</label>
        <input type="password" {...register ("password", {required:'Mot de passe incorrect' })} placeholder="Password" autoComplete='off'
        />
      
      <p>Inscrivez-vous!</p>
      
        <button type="submit" onClick={()=> handleSubmit(data)} >
           S'inscrire 
        </button>
        </form> 
        <Footer/>
    </div>
  );
}

export default Signup;