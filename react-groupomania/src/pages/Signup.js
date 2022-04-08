import React from 'react';
import "../styles/Signup.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_log from '../components/Button_log';
import {useForm} from 'react-hook-form';

const Signup = () => {
  const {register, handleSubmit, formState:{errors}} = useForm();

    const sendRequest = ({firstName, lastName, email, password}) => {
      fetch("http://localhost:3000/api/user/signup",{
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
          console.log(res);
            return res.json();
        }
      })
      .then((user) => {
        console.log(user);
        user={
          firstName:"user.firstName",
          lastName:"user.lastName",
          email:"user.email",
          password:"user.password",
        }
        window.location.assign("/login");
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
        <form className='form' onSubmit={handleSubmit((sendRequest))}>
        <label htmlFor="firstName">Prénom :</label>
        <input {...register ("firstName", {required : 'Ce champ est obligatoire'})} type="text" placeholder="Prénom" autoComplete='off' 
        />
        <p className='msgerror'>{errors.firstName?.message}</p>
        
        <label htmlFor="lastName">Nom :</label>
        <input type="text" {...register ("lastName", {required : 'Ce champ est obligatoire', minlengh:2})} placeholder="Nom" autoComplete='off'
        />
        <p className='msgerror'>{errors.lastName?.message}</p>

        <label htmlFor="email">Email :</label>
        <input type="email" {...register ("email", {required:'Veuillez entrer une adresse mail valide', pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})} placeholder="Email" autoComplete='off'
        />
        <p className='msgerror'>{errors.email?.message}</p>

        <label htmlFor="password">Mot de passe :</label>
        <input type="password" {...register ("password", {required:'Mot de passe incorrect' })} placeholder="Password" autoComplete='off'
        />
        <p className='msgerror'>{errors.password?.message}</p>
      
      <p>Inscrivez-vous!</p>
      
        <button type="submit">
           S'inscrire 
        </button>
        </form> 
        <Footer/>
    </div>
  );
}

export default Signup;