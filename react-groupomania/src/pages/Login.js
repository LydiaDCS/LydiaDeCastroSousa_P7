import React from 'react';
import "../styles/Login.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_sign from '../components/Button_sign';
import {useForm} from 'react-hook-form';

const Login = (data) => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    
    const sendRequest = ({email, password}) => {
        fetch(`http://localhost:3000/api/user/login`,{
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
          }
        })
        .then((user) => {
          user = {
            email:"user.email",
            password:"user.password"
          }
          window.location.assign("/forum");
        })
        .catch((err) => {
          console.log(err);
        });
      }

    return ( < div>
        <Header/>
        <div>
        <form className='form' onSubmit={handleSubmit((sendRequest))}>
            <label htmlFor="email">Email :</label>
            <input {...register ("email", {required:'Veuillez entrer une adresse mail valide', pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})}  type="email" placeholder="Email" />
            <p className='msgerror'>{errors.email?.message}</p>
            <label htmlFor="password">Mot de passe:</label>
            <input {...register ("password", {required:'Mot de passe incorrect', minlengh:4 })}type="password" placeholder="Password"/>
            <p className='msgerror'>{errors.password?.message}</p>
             
      <p>Connectez-vous!</p> 
         <button type="submit">
         Connexion
         </button>  
          <div className='redirection'>
              <hr/>
              <p>Pas encore inscrit ?</p>
          <Button_sign/>
          </div>
            </form> 
            <Footer/>
            </div>
    </div>
    )
};


export default Login;