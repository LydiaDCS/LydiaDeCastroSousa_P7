//j'importe le modèle de la sauce à liker
const Sauce = require('../models/modelSauce');

// export du middleware/fonction likeSauce
exports.likeSauce = (req, res, next) => {
    // récupère le champs likes
    const likeStatus = req.body.like;
    // récupère l'id sauce du paramètre de la requête (de l'url)
    const sauceId = req.params.id;
    // récupère le userId
    const userId = req.body.userId;

    switch (likeStatus) {
        // ajout d'un like
        case 1:
            Sauce.updateOne({ _id: sauceId }, {
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
            Sauce.updateOne({ _id: sauceId }, {
                    $inc: { dislikes: +1 },
                    $push: { usersDisliked: req.body.userId }
                })
                .then(() => res.status(201).json({ message: "Ajout d'un dislike ! " }))
                .catch(error => res.status(400).json({ error }));
            break;

            // suppression like et dislike    
        case 0:
            Sauce.findOne({ _id: sauceId })
                .then(sauce => {
                    //Supprimer son like du tableau UsersLiked
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, {
                                //je retire le like du champs likes
                                $inc: { likes: -1 },
                                // je retire le userId du tableau usersLiked
                                $pull: { usersLiked: userId }
                            })
                            .then(() => res.status(201).json({ message: "Suppression du like !" }))
                            .catch((error) => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                        // Supprimer son dislike de usersDisliked
                        Sauce.updateOne({ _id: sauceId }, {
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