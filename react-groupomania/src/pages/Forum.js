import React from 'react';
import "../styles/Forum.css";
import Footer from '../components/Footer';
import Profil from '../components/Profil';
import Header from '../components/Header';
import Button_deconnect from '../components/Button_deconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forum = () => {
    return ( <div >
        <Header/>
        <div className='page'>
        <section className='main'>
        <h1 > Bienvenue sur Groupomania </h1> <br/>
        <div className="poster">
        <form>
            <div class="poster-header">
            <img alt="profil" class="profil-picture" src=""/>
            <label htmlFor="text-post"></label>
            <input type="text" name="text-post" class="text-post" id="text-post" placeholder="Exprimez-vous"></input>
            </div>
            <div class="poster-footer">
                <label htmlFor="file-input-poster">
                   
                    <p>Importez une image</p>
                </label>
                <input type="file" id="file-input-poster" name="image" accept="images/*"/>
            </div>
<button type="submit" id="submit-post"> Envoyer</button>
        </form>
        </div>
        <br/>
        <article className='post data'>
            <div className='post-header'>
                <a className='profile-link' href=""></a>
                <div className='post-header-picture'>
                    <image src="" alt="portrait de l'auteur de la publication" className='profile-picture'/>
                    <div className='more-data'>
                        <p className='author'></p>
                        <p className='date'></p>
                    </div>
                </div>
            </div>
            <div className='post-body'>
                <div className='body'>
                    <p className='post-message'> Test message</p>
                </div>
            </div>
            <div className='post-footer'>
                <div className='like-comment'>
                    <div className='like-container'>
                    <p className='like-count'></p>
                    </div>
                    <div className='comment-container'>
                        <p className='comment-count'></p>
                    </div>
                </div>
                <hr></hr>
                <div className='comment-section'>
                    <div className='comment'>

                    </div>

                </div>

            </div>

        </article>
        <br/>
        <article className='post data'>
            
        </article>

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