//j'importe le package de cryptage bcrypt pour hasher mot de passe
const bcrypt = require('bcrypt');

//j'importe crypto-js pour crypter l'adresse mail 
const cryptojs = require('crypto-js');

//j'importe le package pour créer et vérifier des tokens
const jwt = require('jsonwebtoken');

//j'importe le model User
const { User } = require("../models");

const fs = require('fs')

//enregistrement de nouveaux utilisateurs -- middleware avec fonction signup
exports.signup = (req, res, next) => {
  console.log(req.body);

  //je récupère toutes mes infos
  let email = req.body.email;
  let lastName = req.body.lastName;
  let firstName = req.body.firstName;
  let password = req.body.password;
  const emailCryptoJs = cryptojs.HmacSHA512(email, "CLE_SECRETE").toString();

  //je vérifie qu'il n'existe pas déjà ce user dans la bdd
  User.findOne({ where: { email: emailCryptoJs } })
    .then(function (user) {
      console.log(user);
      //je vérifie si utilisateur existe ou non
      //s'il n'existe pas
      if (!user) {
        //chiffrer l'email dans la base de donnée
        const emailCryptoJs = cryptojs
          .HmacSHA512(req.body.email, "CLE_SECRETE")
          .toString();
        //je crypte le mot de passe avec hash, 10 tours
        bcrypt.hash(password, 10, function (err, bcryptdPassword) {
          //je crée mon nouveau user
          User.create({
            email: emailCryptoJs,
            lastname: lastName,
            firstname: firstName,
            password: bcryptdPassword,
          })
            //je retourne identifiant du nouveau user
            .then(function () {
              return res.status(201).json({ message: "compte créé" });
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "Utilisateur ne peut pas être trouvé" });
            });
        });
      }
      //s'il existe
      else {
        return res.status(409).json({ error: "Utilisateur existant" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ err });
    });
};

//Connexion d'utilisateur existant -- middleware avec fonction login
exports.login = (req, res, next) => {
  console.log(req.body);
    
    //je récupère les paramètres de connexion
    let email = req.body.email;
    let password = req.body.password;

    //je vérifie si les champs si rempli
    if (email === null || password === null){
        return res.status(400).json({'error':'certains champs sont vides'});
    }

    //chiffrer l'email dans la base de donnée 
    const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, "CLE_SECRETE").toString();

    //Je récupère l'utilisateur de la base de données
    User.findOne({ where: { email: emailCryptoJs } })
        .then(user => {
            //si l'utilisateur n'existe pas par rapport à son email
            if (!user) {
            //non autorisé
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //s'il n'existe pas
                //si user, on compare le mot de passe envoyer par l'utilisateur qui veut se connecter avec le hash du user dans la base de données
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            //si comparaison pas bonne
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                 //si comparaison est bonne, j'utilise la fonction sign pour encoder un nouveau token qui contient un payload (données encodées dans le token) grâce à une clé secrète temporaire, config expiration)
                res.status(200).json({
                    userId: user.id,
                    isAdmin : user.isAdmin,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin },
                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' },
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


//je récupère les infos de mon user 
exports.getOneUser = (req, res, next) => {
  User.findOne({ where:{id: req.params.id}})
  .then((user) => {
          res.status(200).json(user);
          console.log(user);
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );
};

//Modifier l'utilisateur
exports.updateUser = (req, res, next) => {
  if (!user) {
    return res.statut(404).send(`ID unknow :` + req.params.id);
  }
  try {
    if (user, { id: req.params.id }) {
      res.status(201).json({
        message: 'User updated successfully!',
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: req.body.imageUrl,
        bio: req.body.bio
      });
    }
  }
  catch (err) {
    res.statut(400).json({ message: err });
  }
  const user = req.file
  ?{
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  }:{...req.body}
  

};

//supprimer user
exports.deleteUser = (req, res, next) => {
  if (!User) {
    return res.statut(404).send(`ID unknow :` + req.params.id);
  }
  try {
    if (User, { id: req.params.id }) {
      User.remove({ _id: req.params.id }).exec();
          res.status(200).json({
              message: 'Deleted!'
          });
    }
  }
  catch (err) {
          res.status(400).json({
              error: error
          });
  }
};

