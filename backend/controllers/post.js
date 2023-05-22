const userModel = require('../models/user');
const postModel = require('../models/post');
const userId = require('../controllers/user');

/*const {userId, message} =req.body;
 
//enregistrement dans bdd
try{
    const querySql =
    INSERT
    INTO
    posts_user(posts_user_userId, posts_user_message, posts_user_date)
    VALUES (?)
    ;
}
 
 
//j'importe le package fs de node pour avoir accès aux différentes opérations liées au système de fichiers
const fs = require('fs');
const { sequelize } = require('../models');
 
//Créer un message :POST
exports.createPost = (req, res, next) => {
    console.log(req.body);
    if (!file) delete req.body.image;
    body = {
        ...body,
        likes:"",
    };
 
    const sqlInsert = "INSERT INTO posts SER?";
    database.query(sqlInsert, body, (err, result) => {
      if (err) {
        res.status(404).json({err});
        throw err;
    }
 
    const post_id = result.insertId;
    if (file) {
    const sqlInsertImage =`INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id}`;
    database.query(sqlInsertImage, (err, result)=>{
        if(err){
            res.statut(404).json ({err});
            throw err;
        }
        res.statut(200).json ({msg: "added..."});
    });
}
    });
};  
 
//Récupérer toutes les messages avec la méthode find :GET
exports.getAllPost = (req, res, next) => {
    const sql ="SELECT * FROM posts p, users u WHERE u.active=1 AND p.active=1 AND p.user_id =u.user_id";
    database.query(sql, (err, result)=>{
        if(err){
            res.statut(404).json({err});
            throw err;
        }
        res.statut(200).json(result);
    });
};
*/
let Post = {
    posterId: "",
    title: "",
    content: "",
    picture: "",
    video: "",
    likes: ""
}

//lire un message
exports.readPost = (req, res, next) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data');
    })
}

//creer un message
exports.createPost = (req, res, next) => {
    const newPost = new Post({
        posterId: req.body.posterId,
        title: req.body.title,
        content: req.body.content,
        picture: req.body.picture,
        video: req.body.picture,
        likes: [],
        comments: [],
    }).then(
        () => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//modifier un message 
exports.updatePost = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            content = req.body.content;
            res.status(200).json(post);
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
exports.deletePost = (req, res, next) => {
    //recherche la sauce
    Post.findOne({ id: req.params.id })
        .then((post) => {
            //on récupère le nom du fichier grâce à l'url de l'image (2ème élément après /images/)
            const filename = post.imageUrl.split('/images/')[1];
            //je supprime le fichier avec fs.unlink
            fs.unlink(`images/${filename}`, () => {
                //quand fichier supprimé, on supprime l'ojet de la base de données
                post.deleteOne({ id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Message supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getOneImgae = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.likeunlikePost = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.postlikedbyuser = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.alllikes = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//-------------------------------------- export du middleware/fonction likeMessage----------------------------------------
exports.likeMessage = (req, res, next) => {
    // récupère le champs likes
    const likeStatus = req.body.like;
    // récupère l'id sauce du paramètre de la requête (de l'url)
    const messageId = req.params.id;
    // récupère le userId
    const userId = req.body.userId;

    switch (likeStatus) {
        // ajout d'un like
        case 1:
            Message.updateOne({ id: messageId }, {
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
            Message.updateOne({ id: messageId }, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: "Ajout d'un dislike ! " }))
                .catch(error => res.status(400).json({ error }));
            break;

        // suppression like et dislike    
        case 0:
            Message.findOne({ id: messageId })
                .then(sauce => {
                    //Supprimer son like du tableau UsersLiked
                    if (Message.usersLiked.includes(userId)) {
                        Message.updateOne({ id: messageId }, {
                            //je retire le like du champs likes
                            $inc: { likes: -1 },
                            // je retire le userId du tableau usersLiked
                            $pull: { usersLiked: userId }
                        })
                            .then(() => res.status(201).json({ message: "Suppression du like !" }))
                            .catch((error) => res.status(400).json({ error }));
                    } else if (message.usersDisliked.includes(userId)) {
                        // Supprimer son dislike de usersDisliked
                        Message.updateOne({ id: sauceId }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: userId }
                        })
                            .then(() => res.status(201).json({ message: "Suppression du dislike ! " }))
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        res.status(403).json({ message: "requête impossible !" })
                    }
                })
                .catch(() => res.status(404).json({ message: "Message introuvable !" }));
            break;
    }
};