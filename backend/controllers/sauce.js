//j'importe le modèle de la sauce
const Sauce = require('../models/modelSauce');

//j'importe le package fs de node pour avoir accès aux différentes opérations liées au système de fichiers
const fs = require('fs');

//Récupérer toutes les sauces avec la méthode find :GET
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Recupérer une seule sauce avec la méthode findOne : GET
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Ajouter une sauce: POST
exports.createSauce = (req, res, next) => {
    //je récupère le champs de la requête en le transformant en objet
    const sauceObject = JSON.parse(req.body.sauce);
    //je supprime l'id généré automatiquement
    delete sauceObject._id;
    //je crée une nouvelle instance de sauce
    const sauce = new Sauce({
        ...sauceObject,
        //je génère l'url de l'image: http /https + nom d'hôte + nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //j'enregistre la sauce dans la base de données 
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

//Modifier une sauce: PUT avec la méthode updateOne
exports.modifySauce = (req, res, next) => {
    //Opérateur terniaire pour vérifier s'il existe un fichier image ou non
    const sauceObject = req.file ? {
            //si il y a un fichier, on récupère la chaîne de caractère et on la parse en objet javascript
            ...JSON.parse(req.body.sauce),
            //on modifie l'image url 
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } :
        /*sinon on prend le corps de la requête et on utilise le paramètre id de la requête pour trouver la sauce et la modifier avec le même _id*/
        {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(
            () => {
                res.status(201).json({
                    message: 'Sauce updated successfully!'
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

//Supprimer une sauce: DELETE si seulement sauce.userId == auteur de la requête
exports.deleteSauce = (req, res, next) => {
    //recherche la sauce
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            //on récupère le nom du fichier grâce à l'url de l'image (2ème élément après /images/)
            const filename = sauce.imageUrl.split('/images/')[1];
            //je supprime le fichier avec fs.unlink
            fs.unlink(`images/${filename}`, () => {
                //quant fichier supprimé, on supprime l'ojet de la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


//-------------------------------------- export du middleware/fonction likeSauce----------------------------------------
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