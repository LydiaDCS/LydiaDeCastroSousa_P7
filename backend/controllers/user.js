//j'importe le package de cryptage bcrypt pour hasher mot de passe
const bcrypt = require('bcrypt');

//j'importe crypto-js pour crypter l'adresse mail 
const cryptojs = require('crypto-js');

//j'importe le package pour créer et vérifier des tokens
const jwt = require('jsonwebtoken');

//j'importe le model User
const { User } = require("../models");

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
            isAdmin: 0,
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
    
    //je récupère les paramètres de connexion
    let email = req.body.email;
    let password = req.body.password;

    //je vérifie si les champs si rempli
    if (email == null || password == null){
        return res.status(400).json({'error':'certains champs sont vides'});
    }

    //chiffrer l'email dans la base de donnée 
    const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, "CLE_SECRETE").toString();

    //Je récupère l'utilisateur de la base de données
    User.findOne({ where: { email: emailCryptoJs } })
        .then(user => {
            //si l'utilisateur existe par rapport à son email
            if (user) {

            //si user, on compare le mot de passe envoyer par l'utilisateur qui veut se connecter avec le hash du user dans la base de données
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            //si comparaison pas bonne
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                 //si comparaison est bonne, j'utilise la fonction sign pour encoder un nouveau token qui contient un payload (données encodées dans le token) grâce à une clé secrète temporaire, config expiration)
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({ userId: user._id, isAdmin:user._isAdmin },
                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));

            }
            //s'il n'existe pas
            else{
                //non autorisé
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            } 
        })
        .catch(error => res.status(500).json({ error }));
};