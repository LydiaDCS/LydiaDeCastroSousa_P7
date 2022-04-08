import React from 'react';
import "../styles/Profil.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_deconnect from '../components/Button_deconnect';
import Button_forum from '../components/Button_forum';


const Profil = () => {
    async function fetchApi() {
        await fetch("http://localhost:3000/api/profil/:id")
            .then((res) => res.json())
            .then((data) => {
            console.log(data)})
            .catch((err)=>{
                console.log(err);
            })
    }
    function deleteProfile(){

    }
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
            <div className='profil-image'> 
            <img alt="profil" class="profil-picture" src="images/male-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243023.jpg"
            />
            <input accept="image/jpg image/png image/gif" type="file" className='addimages'/>
            </div> 
            <label for="text-post"></label>
            
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
            <button className="deletebutton" onClick={deleteProfile()}>Supprimer</button>
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