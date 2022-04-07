import React from 'react';
import "../styles/Profil.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_deconnect from '../components/Button_deconnect';
import Button_forum from '../components/Button_forum';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Profil = () => {
    
    return ( <div >
        <Header/>
        <div className='container'>
            <div className='comptes'>
                <a href='/'>Administrateur</a>
                <a href='/'>Employé</a>  
            </div>
            <section class="profil_container">
                <h1> Informations </h1>
            <div className='profil'>
                <div>
                <input accept="image/*" type="file"/>
            <img alt="profil" class="profil-picture" src=""/>
            <label for="text-post"></label>
                </div>
            
            <div className="info">
                <div className='form-group'>
                <label for="name">Nom :</label>
                <input formcontrolname="name" id="name" type="text"/>
                </div>
                <div className='form-group'>
                <label for="name">Prénom :</label>
                <input formcontrolname="prénom" id="prénom" type="text"/>
                </div>
            </div>
            </div>
            </section>
            <button className="deletebutton">Supprimer</button>
            <button className="modifybutton">Modifier</button>
            <div className='buttons'>
            <Button_forum/>
            <Button_deconnect/>
            </div>
            </div>
        <Footer/>
        </div>
    );
};

export default Profil;