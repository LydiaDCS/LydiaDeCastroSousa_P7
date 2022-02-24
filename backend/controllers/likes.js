 //liker une sauce

 //j'importe le modèle de la sauce
 const Sauce = require('../models/modelSauce');

 //middleware like
 exports.likeSauce = (req, res, next) => {
     Sauce.findOne({ _id: req.params.id })
         .then((sauce) => {
             //je définie variable pour recevoir les messages
             let message;
             Sauce.updateOne({ _id: req.params.id })
                 //si l'utilisateur aime la sauce et que le Array ne contient pas le userId
             if (req.body.likes === 1 && !sauce.usersLiked.includes(req.body.userId)) {
                 //on push dans le tableau le userId
                 $push: { usersLiked: req.body.userId }
                 //incrementation de la valeur de likes
                 sauce.likes++;
                 message = "L'utilisateur aime cette sauce !";
             }
             Sauce.updateOne({ _id: req.params.id })
                 //si l'utilisateur n'aime pas la sauce
             if (req.body.likes === -1 && !sauce.usersDisliked.includes(req.body.userId)) {
                 $push: { usersDisliked: req.body.userId }
                 sauce.dislikes++;
                 message = "L'utilisateur n'aime pas cette sauce !";
             }
             Sauce.updateOne({ _id: req.params.id })
                 //si l'utilisateur change son appréciation
             if (req.body.likes === 0) {
                 if (sauce.usersLiked.includes(req.body.userId)) {
                     sauce.usersLiked.splice(req.body.userId);
                     sauce.likes--;
                     message = "L'utilisateur a retiré sa mention j'aime !";
                 } else if (sauce.usersDisliked.includes(req.body.userId)) {
                     sauce.usersDisliked.splice(req.body.userId);
                     sauce.dislikes--;
                     message = "L'utilisateur a retiré sa mention j'aime pas!";
                 }
             }
             return res.status(200).json({ message: message });

             /* //je récupère le champ like
             const likeStatus = req.body.like;
             //je récupère le userId
             const userId = req.body.userId;
             //je récupère l'id de la sauce  de l'url
             const sauceId = req.params.id;

             //différents cas
             switch (likeStatus) {
                 //Ajout d'un like
                 case 1:
                     Sauce.updateOne({ _id: sauceId }, { usersLiked: userId }, { likeStatus: 1 })
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
             } */
         })
         .catch(error => res.status(400).json({ error }));
 };