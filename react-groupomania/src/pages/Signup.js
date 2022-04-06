import React from 'react';
import "../styles/Signup.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_log from '../components/Button_log';
import {useForm} from 'react-hook-form';


const Signup = (data) => {
  const {register, 
    handleSubmit,
    errors} = useForm();

    const sendRequest =(data) => {
      fetch(`http://localhost:3000/auth/Signup`,{
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
        <label for="firstName">Prénom :</label>
        <input {...register ("firstName", {required : 'Ce champ est obligatoire'})} type="text" placeholder="Prénom" 
        />
        
        <label for="lastName">Nom :</label>
        <input type="text" {...register ("lastName", {required : 'Ce champ est obligatoire', minlengh:2})} placeholder="Nom" 
        />

        <label for="email">Email :</label>
        <input type="email" {...register ("email", {required:'Veuillez entrer une adresse mail valide', pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})} placeholder="Email" 
        />

        <label for="password">Mot de passe :</label>
        <input type="text" {...register ("password", {required:'Mot de passe incorrect' })} placeholder="Password" 
        />
      
      <p>Inscrivez-vous!</p>

        <button type="submit" /* onClick={()=> handleSubmit(data)} */>
           S'inscrire 
        </button>
        </form> 
        <Footer/>
    </div>
  );
}

export default Signup;