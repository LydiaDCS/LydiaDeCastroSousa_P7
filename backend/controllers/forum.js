

exports.createThing = (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
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

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({ _id: req.params.id }, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
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

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
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

exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
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