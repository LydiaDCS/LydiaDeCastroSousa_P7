const Message = require('../models/message');

exports.createMessage = (req, res, next) => {
    const message = new Message({
        id: req.params.id,
        title: req.body.title,
        content:req.body.content,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });

    if(title == null || content == null){
        return res.status(400).jon({'error':'missing parameters'});
    }
    User.findOne({
        where:{id:userId}
    })
    message.save()
    .then(
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

exports.modifyMessage = (req, res, next) => {
    const Message = new Message({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    Message.updateOne({ id: req.params.id }, message).then(
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

exports.deleteMessage = (req, res, next) => {
    Message.deleteOne({ id: req.params.id }).then(
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
        (message) => {
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