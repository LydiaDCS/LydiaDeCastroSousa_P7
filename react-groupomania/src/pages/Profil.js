
import "../styles/Profil.css";
import UpdateProfil from '../components/Profil/UpdateProfil';
import NavLinkMenu from '../components/Nav/NavlinkMenu';
import React, { useEffect, useState } from 'react';


const Profil = () => {
  let userId = localStorage.getItem("userId");
  console.log(userId);
  let token = localStorage.getItem("token");
  let firstname = localStorage.getItem("firstname");
  let lastname = localStorage.getItem("lastname");

  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(`http://localhost:3000/api/profil/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(user => setUser(user))
      .catch(err => console.log(err))
    console.log(user);
  })

  function deleteProfile() {
    fetch(`http://localhost:3000/api/profil/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("Cet utilisateur est supprimé !");
          localStorage.clear();
          firstname = "";
          lastname = "";
          window.location.assign("/Signup");
        }
      })
      .then((data) => { console.log(data) })
      .catch((err) => {
        console.log(err);
      });
  }

  function modifyProfile() {

  }
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('File', selectedFile);
    fetch(`http://localhost:3000/api/profil/${userId}`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
return ( 
    <div className="profil-page"> 
      <div className='logo'>
        <div className='header'>
        <img
          src='images/icon-left-font-monochrome-white.svg'
          alt='logo entreprise'
        /> 
           <NavLinkMenu/>
        </div>
      </div>  
        <UpdateProfil/>
    <div>
      <div className='container'>
        <section className="profil_container">
          <h1> Profil de {firstname} </h1>
          <div className='profil'>
            <div className='profil-image'>
              <h3>Photo de profil</h3>

              <uploadimg />
              <img alt="profil" className="profil-picture" src=""
              />
              <input type="file" className='addimages' onChange={changeHandler} />
              {isFilePicked ? (
                <div>
                  <p>Filename:{selectedFile.name}</p>
                  <p>Filetype:{selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{''}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Sélectionnez une image</p>
              )}
            </div>
            <button onClick={handleSubmit}>Enregistrer</button>

            <div className="info" deleteProfile={userId}>

              <p className="name">Nom : {lastname}</p>
              <p className="name">Prénom : {firstname}</p>
            </div>
          </div>
        </section>
        <div className='changebuttons'>
          <button className="deletebutton" onClick={() => { deleteProfile(userId); }}>Supprimer</button>
          <button className="modifybutton" onClick={modifyProfile()}>Modifier</button>
        </div>
      </div>
      <br />
      <br />
    </div>
      <div className='footer'>
      <p>Groupomania - Copyright2022@</p>
      </div>
    </div>
    );
};

export default Profil;