import React from 'react';
import "../styles/Login.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_sign from '../components/Button_sign';
import {useForm} from 'react-hook-form';



const Login = () => {
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const validInput =watch("email, password" );
   /*  if(validInput=true){
    }; */
    return ( < div>
        <Header/>
        <div>
            <form className='formuser' onSubmit={handleSubmit((data)=>{
                console.log(data)
            })}>
            <label for="email">Email :</label>
            <input {...register ("email", {required:'this is required', pattern: /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g})}  type="email" placeholder="Email" />
            <p className='msgerror'>{errors.email?.message}</p>
            <label for="password">Mot de passe:</label>
            <input {...register ("password", {required:'this is required', minlengh:4 })}type="text" placeholder="Password"/>
            <p className='msgerror'>{errors.password?.message}</p>
             
      <p>Connectez-vous!</p> 
         <button type="submit">
         <a class="buttoninfo" /* href="Forum" */>Connexion</a> 
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
    );
};

export default Login;