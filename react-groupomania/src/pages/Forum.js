import React from 'react';
import "../styles/Forum.css";
import Footer from '../components/Footer';
import Profil from '../components/Profil';
import Header from '../components/Header';
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forum = () => {
    const sendMessage = (message)=>{
        fetch("http://localhost:3000/api/forum",{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message,
            })
          })
          .then((res) => {
            if (res.ok) {
               console.log(res);
            } alert ("Message posté !");
          })
          .catch((err) => {
            console.log(err);
          });
        }
    return ( <div >
        <Header/>
        <div className='page'>
        <section className='main'>
        <h1 > Bienvenue sur Groupomania </h1> <br/>
        <div className="poster">
        <form>
            <div className="poster-header">
                <img alt="profil" className="profil-picture" src=""/>
                {/*mettre prénom de l'utilisateur*/} 
            </div>
            <div className='poster-main'>
            <label htmlFor="text-post"></label>
            <input type="text" name="text-post" className="text-post" id="text-post" placeholder="Exprimez-vous"></input>
            </div>

            <div className="poster-footer">
                <label htmlFor="file-input-poster">
                    <p>Sélectionnez une image</p>
                    <br/>
                    <br/>
                </label>
                <input type="file" id="file-input-poster" name="image" accept="images/*"/>
            </div>
<button type="submit" onClick={sendMessage} id="submit-post"> Envoyer</button>
        </form>
        </div>
        <br/>

        </section>
        <nav className='nav'>
                <ul className='nav_list'>
                    <a href='/message'>
                        <FontAwesomeIcon className='i' icon="fa-comments"/>
                    </a>
                    <Profil/>
                    <Button_deconnect/>
                </ul>
        </nav>
        </div>
        <Footer/>
        </div>
    );
};

export default Forum;