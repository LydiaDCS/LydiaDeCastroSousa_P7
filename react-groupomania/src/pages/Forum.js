import React from 'react';
import "../styles/Forum.css";
import Footer from '../components/Footer';
import Profil from '../components/Profil';
import Header from '../components/Header';
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forum = () => {
  let lastname =localStorage.getItem("lastname");
  let firstname =localStorage.getItem("firstname");
    const sendMessage = (username, texte, image)=>{
        fetch("http://localhost:3000/api/forum",{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              texte,
              image
            })
          })
          .then((res) => {
            if (res.ok) {
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
        <h1 > Bienvenue sur Groupomania {firstname} </h1> <br/>
        <div className="poster">
        <form>
            <div className="poster-header">
                <img alt="profil" className="profil-picture-forum" src="images/male-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243023.jpg"/>
                <p>{lastname} {firstname}</p> 
            </div>
            <div className='poster-main'>
            <label htmlFor="text-post"></label>
            <textarea type="text" name="text-post" className="text-post" id="text-post" placeholder="Exprimez-vous"></textarea>
            <br/>
                <input type="file" id="file-input-poster" className='buttons' accept="images/*"/>
            </div>

<button type="submit" onSubmit={sendMessage} id="submit-post"> Envoyer</button>
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