const Message = require('../models/message');

//j'importe le package fs de node pour avoir accès aux différentes opérations liées au système de fichiers
const fs = require('fs');

//Créer un message :POST
exports.createMessage = (req, res, next) => {
    Message.create({
        idUSERS: id,
        title: title,
        content: content,
        attachment: imageUrl,
        likes: 0
      })

    Message.save(Message)
    .then(
        () => {
            res.status(201).json({
                message: 'Post created!!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};  
//Récupérer toutes les messages avec la méthode find :GET
exports.getAllMessage = (req, res, next) => {
    Message.find().then(
        (messages) => {
            res.status(200).json(messages);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Recupérer une seul message avec la méthode findOne : GET
exports.getOneMessage = (req, res, next) => {
    Message.findOne({
        id: req.params.id
    }).then(
        (message) => {
            res.status(200).json(message);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


//Supprimer un message: DELETE si seulement message.userId == auteur de la requête ou isAdmin
exports.deleteMessage = (req, res, next) => {
    //recherche la sauce
    Message.findOne({ id: req.params.id})
        .then((message) => {
            //on récupère le nom du fichier grâce à l'url de l'image (2ème élément après /images/)
            const filename = sauce.imageUrl.split('/images/')[1];
            //je supprime le fichier avec fs.unlink
            fs.unlink(`images/${filename}`, () => {
                //quand fichier supprimé, on supprime l'ojet de la base de données
                message.deleteOne({ id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Message supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//-------------------------------------- export du middleware/fonction likeSauce----------------------------------------
exports.likeMessage = (req, res, next) => {
    // récupère le champs likes
    const likeStatus = req.body.like;
    // récupère l'id sauce du paramètre de la requête (de l'url)
    const sauceId = req.params.id;
    // récupère le userId
    const userId = req.body.userId;

    switch (likeStatus) {
        // ajout d'un like
        case 1:
            Sauce.updateOne({ id: sauceId }, {
                    //j'incrémente le champs likes
                    $inc: { likes: +1 },
                    //j'ajoute le userId au tableau usersLiked
                    $push: { usersLiked: req.body.userId }
                })
                .then(() => res.status(201).json({ message: 'Ajout du like !' }))
                .catch(error => res.status(400).json({ error }));
            break;

            //ajout d'un dislike    
        case -1:
            Sauce.updateOne({ id: sauceId }, {
                    $inc: { dislikes: +1 },
                    $push: { usersDisliked: req.body.userId }
                })
                .then(() => res.status(201).json({ message: "Ajout d'un dislike ! " }))
                .catch(error => res.status(400).json({ error }));
            break;

            // suppression like et dislike    
        case 0:
            Sauce.findOne({ id: sauceId })
                .then(sauce => {
                    //Supprimer son like du tableau UsersLiked
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ id: sauceId }, {
                                //je retire le like du champs likes
                                $inc: { likes: -1 },
                                // je retire le userId du tableau usersLiked
                                $pull: { usersLiked: userId }
                            })
                            .then(() => res.status(201).json({ message: "Suppression du like !" }))
                            .catch((error) => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                        // Supprimer son dislike de usersDisliked
                        Sauce.updateOne({ id: sauceId }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: userId }
                            })
                            .then(() => res.status(201).json({ message: "Suppression du dislike ! " }))
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        res.status(403).json({ message: "requête impossible !" })
                    }
                })
                .catch(() => res.status(404).json({ message: "Sauce introuvable !" }));
            break;
    }
};

exports.commentMessage = (req, res, next) => {
    Message.find().then(
        () => {
            res.status(200).json(messages);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};