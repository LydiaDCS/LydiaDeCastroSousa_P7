import React, { useEffect, useState } from 'react';
import "../styles/Profil.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button_deconnect from '../components/Button_deconnect';
import Button_forum from '../components/Button_forum';


const Profil = () => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:3000/api/user/${id}`,{
            headers: {
                authorization:'Bearer'
            }
        })
        .then(user => setUser(user))
        .catch(err => console.log(err))
    })
    console.log(user);
    /* let userId=JSON.parse(localStorage.getItem("userId"));
    let user = {
    };

    async function fetchApi() {
        await fetch("http://localhost:3000/api/forum/:id" + userId)
            .then((res) => res.json())
            .then(user =    
                ({firstname :user.firstname,
                lastName:user.lastName})
            );
    }
    fetchApi();
    console.log(user);  */

function deleteProfile(){
    
}
    return ( <div >
        <Header/> 
        <div className='container'>
            <section className="profil_container">
                <h1> Informations </h1>
            <div className='profil'>
            <div className='profil-image'> 
            <img alt="profil" className="profil-picture" src="images/male-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243023.jpg"
            />
            <label className='imagesForm'>Sélectionnez une image:</label>
            <input accept="image/jpg image/png image/gif" type="file" className='addimages'/>
            </div>
            
            <div className="info">
                
                <p className="name">Nom :{user && user.lastname}</p>
                <p className="name">Prénom : {user && user.firstname}</p>

                {/* <div className='changeprofile'>
                <div className='form-group'>
                <label htmlFor='name'>Nom :</label>
                <input formcontrolname="name" id="name" type="text"/>
                </div>
                <div className='form-group'>
                <label htmlFor="name">Prénom :</label>
                <input formcontrolname="prénom" id="prénom" type="text"/>
                </div>
                </div> */}
            </div>
            </div>
            </section>
            <div className='changebuttons'>
            <button className="deletebutton" onClick={deleteProfile()}>Supprimer</button>
            <button className="modifybutton">Modifier</button>
            </div>
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