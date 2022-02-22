 //liker une sauce

 //j'importe le modèle de la sauce
 const Sauce = require('../models/modelSauce');

 //middleware like
 exports.likeSauce = (req, res, next) => {
     //je récupère le champ like
     const likeStatus = req.body.like;
     //je récupère le userId
     const userId = req.body.userId;
     //je récupère l'id de la sauce  de l'url
     const sauceId = req.params.id;

     //différents cas
     switch (likeStatus) {
         //Ajout d'un like
         case 1:
             Sauce.updateOne({ _id: sauceId }, { usersLiked: userId }, { likeStatus: +1 })
                 .then(() => res.status(201).json({ message: "Ajout d'un like !" }))
                 .catch(error => res.status(400).json({ error }));
             break;
             //Ajout d'un dislike
         case -1:
             Sauce.updateOne({ _id: sauceId }, { likeStatus: -1 })
                 .then(() => res.status(201).json({ message: "Ajout d'un dislike !" }))
                 .catch(error => res.status(400).json({ error }));
             break;
             //Suppression du like et/ou du dislike
         case 0:

             break;
         default:
     }
 };