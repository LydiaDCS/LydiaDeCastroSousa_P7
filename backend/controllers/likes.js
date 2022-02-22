 //liker une sauce

 //j'importe le modèle de la sauce
 const Sauce = require('../models/modelSauce');

 //middleware like
 exports.likeSauce = (req, res, next) => {
     Sauce.updateOne({ _id: req.params.id })
         .then((sauce) => {
             //je définie variable pour recevoir les messages
             let message;
             //si l'utilisateur aime la sauce et que le Array ne contient pas le userId
             if (req.body.likes === 1 && !sauce.usersLiked.includes(req.body.userId)) {
                 //on push dans le tableau le userId
                 sauce.usersLiked.push(req.body.userId);
                 //incrementation de la valeur de likes
                 sauce.likes++;
                 message = "L'utilisateur aime cette sauce !";
             }
             //si l'utilisateur n'aime pas la sauce
             if (req.body.likes === -1 && !sauce.usersDisliked.includes(req.body.userId)) {
                 sauce.usersLiked.push(req.body.userId);
                 sauce.dislikes++;
                 message = "L'utilisateur n'aime pas cette sauce !";
             }
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
         })
         .catch(error => res.status(400).json({ error }));
 };