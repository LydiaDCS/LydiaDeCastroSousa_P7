import React, { useEffect, useState } from 'react';
import "../styles/Forum.css";
import Footer from '../components/Footer';
import Profil from '../components/Profil';
import Header from '../components/Header';
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forum = (title, content, attachment, like) => {
  let lastname =localStorage.getItem("lastname");
  let firstname =localStorage.getItem("firstname");
  let token = localStorage.getItem("token");

  //afficher les messages
  const [message, setMessage] = useState([]);
  
  useEffect(()=>{
    fetch("http://localhost:3000/api/forum",{
      method: 'GET',
      headers: {
        'Authorization':'Bearer ' + token
      }
    })
    .then(message => setMessage(message))
    .catch(err => console.log(err))
},[])

  //envoyer message
    const sendMessage = (e)=>{
        fetch("http://localhost:3000/api/forum",{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title:e.target.title,
              content:e.target.content,
              attachment:e.target.attachment,
              likes:0
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
        <form onSubmit={sendMessage}>
            <div className="poster-header">
                <img alt="profil" className="profil-picture-forum" src={attachment} />
                <p>{lastname} {firstname}</p> 
            </div>
            <div className='poster-main'>
            <label htmlFor="text-post"></label>
            <input type="text" placeholder='Titre' className="titre-post" >{title}</input>
            <br/><br/>
            <textarea type="text" name="text-post" className="text-post" id="text-post" placeholder="Exprimez-vous" >{content}</textarea>
            <br/>
                <input type="file" id="file-input-poster" className='buttons' accept="images/*"/>
            </div>

<button type="submit" id="submit-post"> Envoyer</button>
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
        {/* {message.map(()=>{
            <poster
            title={title}
            content={content}
            attachment={attachment}/>
          })} */}
        </div>
    );
};
export default Forum;