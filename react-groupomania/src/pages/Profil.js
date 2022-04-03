import React from 'react';
import "../styles/Profil.css";
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import Button_deconnect from '../components/Button_deconnect';
import Button_forum from '../components/Button_forum';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Profil = () => {
    
    return ( <div >
        <Header2/>
        <div className='container'>
            <div className='comptes'>
                <a href=''>Administrateur</a>
                <a href=''>Employé</a>  
            </div>
            <section class="profil_container">
                <h1> Informations </h1>
            <div className='profil'>
            <FontAwesomeIcon className='icon' icon="fa-solid fa-user" />
            <div class="info">
                <p>Nom :</p>
                <br/>
                <p>Prénom :</p>
                <br/>
                <p>Date de naissance :</p>
                <br/>
                <p>Ville :</p> 
                <br/>
            </div>
            </div>
            </section>
            <button className="deletebutton">Supprimer</button>
            <button className="modifybutton">Modifier</button>
            <div className='buttons'>
            <Button_deconnect/>
            <Button_forum/>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default Profil;