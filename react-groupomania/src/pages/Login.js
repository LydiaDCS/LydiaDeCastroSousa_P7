import React from 'react';
import "../styles/Login.css"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_sign from '../components/Button_sign';



const Login = () => {
    return ( < div>
        <Header/>
        <div>
            <form className='formuser'>
            <label for="email">Email :</label>
            <input type="email" name="email" placeholder="Email" />
            <label for="password">Mot de passe:</label>
            <input type="text" name="password" placeholder="Password"/>
             
      <p>Connectez-vous!</p>
            <button>
          <a class="buttoninfo" href="Forum">Connexion</a> 
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